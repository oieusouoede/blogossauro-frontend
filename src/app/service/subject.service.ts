import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Subject } from '../model/Subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  subjectList: Subject[];

  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${environment.apiURL}/api/subject/all`,
      this.token
    );
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(
      `${environment.apiURL}/api/subject/${id}`,
      this.token
    );
  }

  postSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(
      `${environment.apiURL}/api/subject`,
      subject,
      this.token
    );
  }

  putSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(
      `${environment.apiURL}/api/subject`,
      subject,
      this.token
    );
  }

  deleteSubject(id: number) {
    return this.http.delete(
      `${environment.apiURL}/api/subject/${id}`,
      this.token
    );
  }

  listSubjects() {
    this.getAllSubjects().subscribe({
      next: (resp: Subject[]) => {
        this.subjectList = resp;
      },
      error: (err) => {
        alert('Erro !!! ' + err.error.message);
      },
    });
  }
}
