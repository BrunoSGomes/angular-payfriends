import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { PaymentsComponent } from '../../payments.component';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private paymentsComponent: PaymentsComponent
  ) { }

  public newTaskForm: FormGroup

  async ngOnInit() {
    this.newTaskForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      title: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      image: ['https://robohash.org/quismaximefuga.png?size=150x150&set=set1', Validators.required],
      isPayed: ['', Validators.required]
    })
  }

  public async closeNewTask(msg: string) {
    await this.modalController.dismiss(msg);
  }

  private async alertFunction(msg: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: msg,
      buttons: ['OK']
    })
    await alert.present()
  }

  public async requestTask() {

    if (this.newTaskForm.valid) {

      try {
        this.newTaskForm.controls['value'].setValue(parseInt(this.newTaskForm.value['value']))
        this.newTaskForm.controls['isPayed'].setValue(this.newTaskForm.value['isPayed'] === 'true' ? true : false)
        await this.tasksService.createTask(this.newTaskForm.value)
        await this.alertFunction('Pagamento adicionado com sucesso!')
        await this.paymentsComponent.refreshTable()
        await this.closeNewTask('create')
      } catch (error) {
        await this.alertFunction('Falha ao adicionar um novo pagamento.')
        throw (error)
      }

    }

  }

}
