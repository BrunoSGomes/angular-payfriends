import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-patch-task',
  templateUrl: './patch-task.component.html',
  styleUrls: ['./patch-task.component.scss']
})
export class PatchTaskComponent implements OnInit {

  @Input() id: string
  @Input() name: string
  @Input() username: string
  @Input() title: string
  @Input() value: string
  @Input() date: string
  @Input() isPayed: string

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private tasksService: TasksService,
  ) { }

  public patchTaskForm: FormGroup

  async ngOnInit() {
    this.patchTaskForm = this.fb.group({
      id: [this.id, Validators.required],
      name: [this.name.split('|')[0], Validators.required],
      username: [this.username, Validators.required],
      title: [this.title, Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      isPayed: ['', Validators.required]
    })
  }

  public async closePatchTask(msg: string) {
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

  public async patchTask() {

    if (this.patchTaskForm.valid) {

      try {
        this.patchTaskForm.controls['value'].setValue(parseInt(this.patchTaskForm.value['value']))
        this.patchTaskForm.controls['isPayed'].setValue(this.patchTaskForm.value['isPayed'] === 'true' ? true : false)
        await this.tasksService.updateTask(this.patchTaskForm.value)
        await this.alertFunction('Pagamento alterado com sucesso!')
        await this.closePatchTask('patch')
      } catch (error) {
        await this.alertFunction('Falha ao alterar um pagamento.')
        throw (error)
      }

    }

  }

}
