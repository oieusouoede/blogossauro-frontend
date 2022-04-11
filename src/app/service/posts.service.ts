import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postsList: Post[];

  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${environment.apiURL}/api/posts/all`,
      this.token
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(
      `${environment.apiURL}/api/posts/${id}`,
      this.token
    );
  }

  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(
      `${environment.apiURL}/api/posts`,
      post,
      this.token
    );
  }

  putPost(post: Post): Observable<Post> {
    return this.http.put<Post>(
      `${environment.apiURL}/api/posts`,
      post,
      this.token
    );
  }

  deletePost(id: number) {
    return this.http.delete(
      `${environment.apiURL}/api/posts/${id}`,
      this.token
    );
  }

  listPosts() {
    this.getAllPosts().subscribe({
      next: (resp: Post[]) => {
        this.postsList = resp;
      },
      error: (err) => {
        alert('Erro !!! ' + err.error.message);
      },
    });
  }
}
