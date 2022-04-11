import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment.prod';
import { DeletePostComponent } from '../delete/delete-post/delete-post.component';
import { EditPostComponent } from '../edit/edit-post/edit-post.component';
import { EditUserComponent } from '../edit/edit-user/edit-user.component';
import { Post } from '../model/Post';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostsService } from '../service/posts.service';
import { SubjectService } from '../service/subject.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  modalR: BsModalRef;
  user: User = new User();
  userId: number;

  constructor(
    public postsService: PostsService,
    public subjectService: SubjectService,
    public userService: UserService,
    public modalRef: BsModalRef,
    public auth: AuthService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['login']);
    }
    this.userId = this.route.snapshot.params['id'];
    this.findUserById(this.userId);
  }

  findUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (resp: User) => {
        this.user = resp;
      },
      error: (err) => {
        alert('Erro !!! ' + err.error.message);
      },
    });
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

  hasImage(picture: string) {
    let pic = false;
    if (picture != '') {
      pic = true;
    }
    return pic;
  }
}
