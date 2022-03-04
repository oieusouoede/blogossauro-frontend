import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
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
    public modalRef: BsModalRef
  ) {}

  ngOnInit() {}

  deleteSubject(id: number) {
    this.subjectService.deleteSubject(id).subscribe(() => {
      alert('Tema deletado!');
      this.modalRef.hide();
    });
  }
}
