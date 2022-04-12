import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/service/alert.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-delete-subject',
  templateUrl: './delete-subject.component.html',
  styleUrls: ['./delete-subject.component.css'],
})
export class DeleteSubjectComponent implements OnInit {
  subject: any;

  constructor(
    private subjectService: SubjectService,
    public modalRef: BsModalRef,
    private alert: AlertService
  ) {}

  ngOnInit() {}

  deleteSubject(id: number) {
    this.subjectService.deleteSubject(id).subscribe({
      next: () => {
        this.modalRef.hide();
        this.alert.info('Tema deletado!');
        this.subjectService.listSubjects();
      },
      error: (err) => {
        this.alert.danger(err.error.message);
      },
    });
  }
}
