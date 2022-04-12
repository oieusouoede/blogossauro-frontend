import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/model/User';
import { UserCredentials } from 'src/app/model/UserCredentials';
import { UserLogin } from 'src/app/model/UserLogin';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  // Modal
  bsModalRef: BsModalRef;

  // Edited user
  userId: number;
  editedUser: User = new User();

  // Authentication DTO
  verifyUser: UserLogin = new UserLogin();

  // Passwords
  newPasswd: string;
  checkNewPasswd: string;
  currentPasswd: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.findUserById(this.userId);
  }

  findUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (resp: User) => {
        this.editedUser = resp;
      },
      error: (err) => {
        alert('Erro !!! ' + err.error.message);
      },
    });
  }

  checkPasswd() {
    if (
      this.newPasswd != null &&
      this.newPasswd != undefined &&
      this.newPasswd != ''
    ) {
      if (this.newPasswd == this.checkNewPasswd) {
        this.editedUser.passwd = this.newPasswd;
        return true;
      } else {
        alert('As senhas não são iguais');
        return false;
      }
    }
    this.editedUser.passwd = this.currentPasswd;
    return true;
  }

  checkPicture() {
    if (
      this.editedUser.picture == null &&
      this.editedUser.picture == undefined &&
      this.editedUser.picture == ''
    ) {
      this.editedUser.picture = '../../assets/dino.jpg';
    }
  }

  getNewPasswd(event: any) {
    this.newPasswd = event.target.value;
  }

  confirmNewPasswd(event: any) {
    this.checkNewPasswd = event.target.value;
  }

  confirmChanges(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

  saveChanges() {
    this.verifyUser.email = this.editedUser.email;
    this.verifyUser.passwd = this.currentPasswd;

    this.authService.login(this.verifyUser).subscribe({
      next: () => {
        if (this.checkPasswd()) {
          this.checkPicture();
          this.bsModalRef.hide();
          this.userService.putUser(this.editedUser).subscribe(() => {
            environment.picture = '';
            environment.id = 0;
            environment.name = '';
            environment.token = '';
            environment.email = '';
            environment.role = '';
            environment.username = '';

            this.router.navigate(['/login']);
            alert('Usuário atualizado! Por favor, faça o login novamente.');
          });
        }
      },
      error: (err) => {
        this.currentPasswd = '';
        this.bsModalRef.hide();
        alert('Erro !!! ' + err.error.message);
      },
    });
  }
}
