import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Subject } from '../model/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>('https://blogossauro.herokuapp.com/subject/all', this.token);
  }

  getSubjectById(id: number): Observable<Subject>{
    return this.http.get<Subject>(`https://blogossauro.herokuapp.com/subject/${id}`, this.token)
  }

  postSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>('https://blogossauro.herokuapp.com/subject', subject, this.token);
  }

  putSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>("https://blogossauro.herokuapp.com/subject", subject, this.token);
  }

  deleteSubject(id: number){
    return this.http.delete(`https://blogossauro.herokuapp.com/subject/${id}`, this.token);
  }

}
