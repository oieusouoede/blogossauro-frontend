import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserCredentials } from '../model/UserCredentials';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(userLogin: UserLogin): Observable<UserCredentials> {
    return this.http.post<UserCredentials>('https://blogossauro.herokuapp.com/api/user/login', userLogin);

  }

  register(user: User): Observable<User> {
    return this.http.post<User>('https://blogossauro.herokuapp.com/api/user/register', user);
  }

  logged(){
    let ok = false;

    if (environment.token != '') {
      ok = true;
    }
    return ok;
  }

  isAdmin() {
    let adm = false;

    if(environment.role == 'adm') {
      adm = true;
    }
    return adm;
  }

}
