import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/service/alert.service';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css'],
})
export class DeletePostComponent implements OnInit {
  post: any;

  constructor(
    private service: PostsService,
    public modalRef: BsModalRef,
    private alert: AlertService
  ) {}

  ngOnInit() {}

  deletePost(id: number) {
    this.service.deletePost(id).subscribe({
      next: () => {
        this.modalRef.hide();
        this.alert.info('Post deletado!');
        this.service.listPosts();
      },
      error: (err) => {
        this.alert.danger(err.error.message);
      },
    });
  }
}
