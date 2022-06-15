import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../shared/auth/auth.service';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PatchTaskComponent } from './components/update-task/patch-task.component';
import { ITasks } from './interfaces/tasks.interface';
import { ButtonRendererComponent } from './render/button-render.component';
import { TasksService } from './services/tasks/tasks.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  public frameworkComponents: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private tasksService: TasksService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    public authService: AuthService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
  }

  public readonly columnDefs = [
    {
      headerName: 'Usuário',
      field: 'name',
      filter: true,
      sortable: true,
      resizable: true,
      flex: 1
    },
    {
      headerName: 'Título',
      field: 'title',
      filter: true,
      sortable: true,
      resizable: true,
      flex: 1,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Data',
      field: 'date',
      filter: true,
      sortable: true,
      resizable: true,
      flex: 1,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Valor',
      field: 'value',
      filter: true,
      sortable: true,
      resizable: true,
      flex: 1,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Pago',
      field: 'isPayed',
      editable: false,
      cellRenderer: (params) => {
        return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
      },
      filter: false,
      sortable: false,
      resizable: false,
      width: 56,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: '',
      filter: false,
      sortable: false,
      resizable: false,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.alterOrDelete.bind(this),
        label: 'Excluir'
      },
      flex: 1,
      cellStyle: { textAlign: 'right' }
    },
  ]
  public rowData: ITasks[]
  private cloneRowData: ITasks[]

  public async ngOnInit(): Promise<void> {
    await this.refreshTable()
  }

  private async alterOrDelete(ev: any): Promise<void> {
    if (ev.type === 'delete') {
      await this.showDeleteAlert(ev.rowData)
    } else {
      await this.openPatchTaskModal(ev.rowData)
    }
  }

  public async openNewTaskModal(): Promise<void> {
    const openModal = await this.modalController.create({
      component: NewTaskComponent,
      cssClass: 'task-modal'
    })

    openModal.onDidDismiss().then(async (data) => {
      if (data.data === 'create') {
        await this.refreshTable()
      }
    })

    return openModal.present()
  }

  public async openPatchTaskModal(task: ITasks): Promise<void> {
    const openModal = await this.modalController.create({
      component: PatchTaskComponent,
      cssClass: 'task-modal',
      componentProps: task
    })

    openModal.onDidDismiss().then(async (data) => {
      if (data.data === 'patch') {
        await this.refreshTable()
      }
    })

    return openModal.present()
  }

  public async openProfileModal(): Promise<void> {
    const openModal = await this.modalController.create({
      component: ProfileComponent,
      cssClass: 'profile-modal'
    })
    return openModal.present()
  }

  public async refreshTable(): Promise<void> {
    this.rowData = await this.tasksService.getAllTasks()
      .then((tasks) => {
        const formalizedTasks = tasks.map((task) => {

          task.name = `${task.name} | @${task.username}`
          task.date = this.datePipe.transform(task.date, 'dd/MM/yyyy HH:mm')
          task.value = this.currencyPipe.transform(task.value)

          return task

        })
        return formalizedTasks
      })
    this.cloneRowData = this.rowData
  }

  private async showDeleteAlert(task: ITasks): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Excluir pagamento',
      message: `
      Usuário: ${task.username} <br>
      Data: ${task.date} <br>
      Valor: ${task.value}
      `,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Excluir',
          handler: () => {
            this.deleteTask(task)
          }
        }
      ]
    })

    return alert.present()
  }

  public async deleteTask(task: ITasks): Promise<ITasks> {
    const deletedTask = await this.tasksService.deleteTask(task)
    await this.refreshTable()
    return deletedTask
  }

  public searchFilter(ev: any): void {
    const val = ev.target.value
    if (val && val.trim() !== '') {
      const valArray = val.split(',')
      this.rowData = this.cloneRowData
      this.rowData = this.rowData.filter((task) => {
        let test = false
        for (const e of valArray) {
          if (
            e !== '' && (
              task.name.toLowerCase().indexOf(e.toLowerCase().trim()) > -1 ||
              task.username.toLowerCase().indexOf(e.toLowerCase().trim()) > -1
            )) {
            test = true
            continue
          }
        }
        return test
      })
    } else {
      this.rowData = this.cloneRowData
    }
  }

}
