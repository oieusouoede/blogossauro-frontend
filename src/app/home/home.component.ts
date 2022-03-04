import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name = environment.name;
  picture = environment.picture;

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
      alert('Usuário não autenticado');
    }
  }
}
