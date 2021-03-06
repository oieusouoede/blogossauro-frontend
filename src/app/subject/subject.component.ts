import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteSubjectComponent } from '../delete/delete-subject/delete-subject.component';
import { EditSubjectComponent } from '../edit/edit-subject/edit-subject.component';
import { Subject } from '../model/Subject';
import { AlertService } from '../service/alert.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  modalR: BsModalRef;
  subject: Subject = new Subject();
  subjectId: number;

  constructor(
    public subjectService: SubjectService,
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.subjectService.listSubjects();
  }

  newSubject() {
    this.subjectService.postSubject(this.subject).subscribe({
      next: (resp: Subject) => {
        this.subject = resp;
        this.alert.success('Novo tema cadastrado com sucesso!');
        this.resetSubject();
        this.subjectService.listSubjects();
      },
      error: (err) => {
        this.alert.danger(err.error.message);
      },
    });
  }

  saveSubject() {
    this.subjectService.putSubject(this.subject).subscribe({
      next: (resp: Subject) => {
        this.subject = resp;
        this.alert.success('Tema atualizado!');
        this.modalR.hide();
        this.resetSubject();
        this.subjectService.listSubjects();
      },
      error: (err) => {
        this.alert.danger(err.error.message);
      },
    });
  }

  resetSubject() {
    this.subject = new Subject();
  }

  openEditSubjectModal(sbj: Subject) {
    const initialState = { subject: sbj };
    this.modalR = this.modalService.show(EditSubjectComponent, {
      initialState,
    });
  }

  openDeleteSubjectModal(sbj: Subject) {
    const initialState = { subject: sbj };
    this.modalR = this.modalService.show(DeleteSubjectComponent, {
      initialState,
    });
  }
}
