import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment.prod';
import { DeletePostComponent } from '../delete/delete-post/delete-post.component';
import { EditPostComponent } from '../edit/edit-post/edit-post.component';
import { Post } from '../model/Post';
import { Subject } from '../model/Subject';
import { User } from '../model/User';
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
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.subjectService.listSubjects();
    this.postsService.listPosts();
  }

  subjectById() {
    this.subjectService
      .getSubjectById(this.subjectId)
      .subscribe((resp: Subject) => {
        this.subject = resp;
      });
  }

  createPost() {
    this.subject.id = this.subjectId;
    this.user.id = environment.id;
    this.post.subject = this.subject;
    this.post.author = this.user;

    this.postsService.savePost(this.post).subscribe((resp: Post) => {
      this.post = resp;
      alert('Publicado!');
      this.post = new Post();
      this.postsService.listPosts();
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
