import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Subject } from '../model/Subject';
import { AuthService } from '../service/auth.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  name = environment.name;
  picture = environment.picture;
  subject: Subject = new Subject()
  subjectList: Subject[]

  constructor(
    private router: Router,
    private subjectService: SubjectService,
    public auth: AuthService

    ) {}

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == '') {
      this.router.navigate(['/login']);
      alert('Usuário não autenticado');
    }
  }

  setAvatar() {
    if (this.picture == null) {
      return '../../assets/dino.jpg';
    } else {
      return this.picture;
    }
  }

  listSubjects(){
    this.subjectService.getAllSubjects().subscribe((resp: Subject[]) => {
      this.subjectList = resp
    })
  }

  newSubject(){
    this.subjectService.postSubject(this.subject).subscribe((resp: Subject) => {
      this.subject = resp
      alert('Novo tema cadastrado com sucesso!')
      this.resetSubject()
      this.listSubjects()
    })
  }

  setSubject(modifiedSbj: Subject){
      this.subject = modifiedSbj
  }

  saveSubject(){
    this.subjectService.putSubject(this.subject).subscribe((resp: Subject) => {
      this.subject = resp
      alert("Tema atualizado!")
      this.resetSubject()
      this.listSubjects()
    })
  }

  resetSubject(){
    this.subject = new Subject()
  }

  deleteSubject(id: number){
    this.subjectService.deleteSubject(id).subscribe(() => {
      alert("Tema deletado!")
      this.listSubjects()
    })
  }
}
