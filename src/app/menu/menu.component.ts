import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  name = environment.name;
  picture = environment.picture;
  id = environment.id;

  constructor(private router: Router) {}

  ngOnInit() {}

  logOut() {
    this.router.navigate(['/login']);
    environment.id = 0;
    environment.name = '';
    environment.email = '';
    environment.picture = '';
    environment.role = '';
    environment.token = '';
    environment.username = '';
  }

  setAvatar() {
    if (this.picture == null) {
      return '../../assets/dino.jpg';
    } else {
      return this.picture;
    }
  }
}
