import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  public email: string
  public password: string

  ngOnInit(): void {
  }

  public async login(): Promise<void> {
    try {
      await this.authService.login({ email: this.email, password: this.password })
      this.router.navigate(['payments'])
    } catch (error) {
      await this.alertFunction('Usuário/senha incorreto')
    }
  }

  private async alertFunction(msg: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: msg,
      buttons: ['OK']
    })
    await alert.present()
  }

}
