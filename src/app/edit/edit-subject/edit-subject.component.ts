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

  ngOnInit() {}

  saveSubject() {
    this.subject.description = this.newDescription;
    this.subjectService.putSubject(this.subject).subscribe((resp: Subject) => {
      this.subject = resp;
      alert('Tema atualizado!');
      this.modalRef.hide();
    });
  }

  cancel() {
    this.modalRef.hide();
  }
}
