import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IAccount } from '../interfaces/account.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = 'http://localhost:3000/account'

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public async login(user: Partial<IAccount>): Promise<void> {

    const auth = await this.httpClient.get<IAccount[]>(
      this.url, {
      params: {
        email: user.email,
        password: user.password
      }
    }).toPromise()

    if (auth.length !== 0) {
      localStorage.setItem('token', 'token')
      localStorage.setItem('login', auth[0].email)
      localStorage.setItem('name', auth[0].name)
    } else {
      throw new Error('Não foi possível autenticar')
    }

  }

  public async logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('login')
    localStorage.removeItem('name')
    this.router.navigate(['home'])
  }

}