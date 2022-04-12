import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment.prod';
import { DeletePostComponent } from '../delete/delete-post/delete-post.component';
import { EditPostComponent } from '../edit/edit-post/edit-post.component';
import { Post } from '../model/Post';
import { Subject } from '../model/Subject';
import { User } from '../model/User';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';
import { PostsService } from '../service/posts.service';
import { SubjectService } from '../service/subject.service';
import { UserService } from '../service/user.service';
import { SubjectComponent } from '../subject/subject.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  modalR: BsModalRef;
  subject: Subject = new Subject();
  subjectId: number;
  post: Post = new Post();
  user: User = new User();

  constructor(
    public postsService: PostsService,
    public subjectService: SubjectService,
    public userService: UserService,
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    public auth: AuthService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.subjectService.listSubjects();
    this.postsService.listPosts();
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

  createPost() {
    this.subject.id = this.subjectId;
    this.user.id = environment.id;
    this.post.author = this.user;
    if (this.subject.id != undefined) {
      this.post.subject = this.subject;
    }

    this.postsService.savePost(this.post).subscribe({
      next: (resp: Post) => {
        this.post = resp;
        this.alert.success('Publicado!');
        this.post = new Post();
        this.postsService.listPosts();
      },
      error: (err) => {
        this.alert.danger(err.error.message);
      },
    });
  }

  hasImage(picture: string) {
    let pic = false;
    if (picture != '') {
      pic = true;
    }
    return pic;
  }

  openSubjectModal() {
    this.modalR = this.modalService.show(SubjectComponent);
  }

  openDeletePostModal(post: Post) {
    const initialState = { post: post };
    this.modalR = this.modalService.show(DeletePostComponent, {
      initialState,
    });
  }

  openEditPostModal(post: Post) {
    const initialState = { post: post };
    this.modalR = this.modalService.show(EditPostComponent, {
      initialState,
    });
  }
}
