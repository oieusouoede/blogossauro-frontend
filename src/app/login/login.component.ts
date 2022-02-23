import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login(event: any){
    this.authService.login(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp
    })
  }
}
