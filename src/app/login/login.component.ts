import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { UserCredentials } from '../model/UserCredentials';
import { UserLogin } from '../model/UserLogin';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';
import { PostsService } from '../service/posts.service';
import { SubjectService } from '../service/subject.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();
  userCredentials: UserCredentials = new UserCredentials();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private subjectService: SubjectService,
    private postService: PostsService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  login(event: any) {
    this.authService.login(this.userLogin).subscribe({
      next: (resp: UserCredentials) => {
        this.userCredentials = resp;

        environment.picture = this.userCredentials.picture;
        environment.id = this.userCredentials.id;
        environment.name = this.userCredentials.name;
        environment.token = this.userCredentials.basicToken;
        environment.email = this.userCredentials.email;
        environment.role = this.userCredentials.user_role;
        environment.username = this.userCredentials.username;

        this.userService.refreshToken();
        this.postService.refreshToken();
        this.subjectService.refreshToken();

        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.alert.danger('Erro!!! ' + err.error.message);
      },
    });
  }
}
