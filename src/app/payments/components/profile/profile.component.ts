import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  public email: string = localStorage.getItem('login')
  public name: string = localStorage.getItem('name')

  async ngOnInit(): Promise<void> { }

  public async closeProfile() {
    await this.modalController.dismiss();
  }

}
