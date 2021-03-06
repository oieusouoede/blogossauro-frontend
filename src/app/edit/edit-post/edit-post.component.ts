import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Post } from 'src/app/model/Post';
import { Subject } from 'src/app/model/Subject';
import { AlertService } from 'src/app/service/alert.service';
import { PostsService } from 'src/app/service/posts.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  post: any;
  editedPost: Post = new Post();
  subject: Subject = new Subject();
  subjectId: number;

  constructor(
    private service: PostsService,
    public subjectService: SubjectService,
    public modalRef: BsModalRef,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.editedPost = this.post;
    this.subjectId = this.post.subject.id;
  }

  savePost() {
    this.subject.id = this.subjectId;
    this.editedPost.subject = this.subject;

    this.service.putPost(this.editedPost).subscribe({
      next: (resp: Post) => {
        this.editedPost = resp;
        this.modalRef.hide();
        this.alert.success('Post atualizado!');
        this.service.listPosts();
      },
      error: (err) => {
        this.alert.danger(err.error.message);
      },
    });
  }

  cancel() {
    this.service.listPosts();
    this.modalRef.hide();
  }

  subjectById() {
    this.subjectService.getSubjectById(this.subjectId).subscribe({
      next: (resp: Subject) => {
        this.subject = resp;
      },
      error: (err) => {
        this.alert.danger(err.error.message);
      },
    });
  }
}
