import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';
import { Subject } from '../model/Subject';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostsService } from '../service/posts.service';
import { SubjectService } from '../service/subject.service';
import { SubjectComponent } from '../subject/subject.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  modalRef: BsModalRef;
  subject: Subject = new Subject();
  subjectId: number;
  subjectList: Subject[];
  post: Post = new Post();
  postsList: Post[];
  user: User = new User();

  constructor(
    private postsService: PostsService,
    private subjectService: SubjectService,
    private modalService: BsModalService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.listSubjects();
    this.getAllPosts();
  }

  listSubjects() {
    this.subjectService.getAllSubjects().subscribe((resp: Subject[]) => {
      this.subjectList = resp;
    });
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
      this.getAllPosts();
    });
  }

  getAllPosts() {
    this.postsService.getAllPosts().subscribe((resp: Post[]) => {
      this.postsList = resp;
    });
  }

  hasImage(picture: string) {
    let pic = false;
    if (picture != '') {
      pic = true;
    }
    return pic;
  }

  isAuthor(id: number) {
    let author = false;
    if (id == environment.id) {
      author = true;
    }
    return author;
  }

  openSubjectModal() {
    this.modalRef = this.modalService.show(SubjectComponent);
  }
}
