import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { UserCredentials } from '../model/UserCredentials';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()
  userCredentials: UserCredentials = new UserCredentials()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login(event: any){
    this.authService.login(this.userLogin).subscribe({
      next: (resp: UserCredentials) => {
        this.userCredentials = resp

        environment.picture = this.userCredentials.picture
        environment.id = this.userCredentials.id
        environment.name = this.userCredentials.name
        environment.token = this.userCredentials.basicToken
        environment.email = this.userCredentials.email
        environment.role = this.userCredentials.user_role
        environment.username = this.userCredentials.username

        console.log(environment)

        this.router.navigate(['/home'])
      },
      error: err => {
        if(err.status == 400){
          alert("Usuário ou senha inválidos")
        }
      }
    })
  }
}
