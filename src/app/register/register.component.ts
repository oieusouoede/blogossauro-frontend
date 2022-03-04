import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  passwdToCheck: string;
  role: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  passwdCheck(event: any) {
    this.passwdToCheck = event.target.value;
  }

  userRole(event: any) {
    this.role = event.target.value;
  }

  register(event: any) {
    this.user.user_role = this.role;

    if (this.user.passwd != this.passwdToCheck) {
      alert('As senhas são diferentes');
    } else {
      if (this.user.picture == null) {
        this.user.picture = '../../assets/dino.jpg';
      }
      this.authService.register(this.user).subscribe((resp: User) => {
        this.user = new User();
        this.router.navigate(['/login']);
        alert('Usuário cadastrado!');
      });
    }
  }
}
