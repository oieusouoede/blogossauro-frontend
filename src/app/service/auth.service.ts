import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
