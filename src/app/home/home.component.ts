import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User = new User();
  userId = environment.id;
  name = environment.name;
  picture = environment.picture;
  bio = environment.biography;

  constructor(
    private router: Router,
    public auth: AuthService,
    public userService: UserService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
      this.alert.danger('Usuário não autenticado');
    } else {
      this.getUser();
    }
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (resp: User) => {
        this.user = resp;
      },
      error: (err) => {
        this.alert.danger(err.error.message);
      },
    });
  }
}
