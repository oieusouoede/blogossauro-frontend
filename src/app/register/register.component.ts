import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertService } from '../service/alert.service';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

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
    this.user.user_role = 'normal';

    if (this.user.passwd != this.passwdToCheck) {
      this.alert.danger('As senhas são diferentes');
    } else {
      if (this.user.picture == null) {
        this.user.picture = '../../assets/dino.jpg';
      }
      if (this.user.biography == null) {
        this.user.biography = 'Não tem bio ainda';
      }
      this.authService.register(this.user).subscribe({
        next: (resp: User) => {
          this.user = new User();
          this.router.navigate(['/login']);
          this.alert.success('Usuário cadastrado!');
        },
        error: (err) => {
          this.alert.danger(err.error.message);
        },
      });
    }
  }
}
