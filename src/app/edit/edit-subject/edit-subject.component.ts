import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'src/app/model/Subject';

import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css'],
})
export class EditSubjectComponent implements OnInit {
  subject: any;
  newDescription: string;

  constructor(
    private subjectService: SubjectService,
    public modalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.newDescription = this.subject.description;
  }

  saveSubject() {
    this.subject.description = this.newDescription;
    this.subjectService.putSubject(this.subject).subscribe({
      next: (resp: Subject) => {
        this.subject = resp;
        this.modalRef.hide();
        alert('Tema atualizado!');
        this.subjectService.listSubjects();
      },
      error: (err) => {
        alert('Erro !!! ' + err.error.message);
      },
    });
  }

  cancel() {
    this.subjectService.listSubjects();
    this.modalRef.hide();
  }
}
