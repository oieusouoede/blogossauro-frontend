import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { SubjectComponent } from './subject/subject.component';
import { EditSubjectComponent } from './edit/edit-subject/edit-subject.component';
import { EditPostComponent } from './edit/edit-post/edit-post.component';
import { DeletePostComponent } from './delete/delete-post/delete-post.component';
import { DeleteSubjectComponent } from './delete/delete-subject/delete-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PostsComponent,
    SubjectComponent,
    EditSubjectComponent,
    EditPostComponent,
    DeletePostComponent,
    DeleteSubjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
