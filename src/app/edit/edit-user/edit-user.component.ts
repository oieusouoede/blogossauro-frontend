import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user: any;
  editedUser: User = new User();
  modifiedPasswd: string;
  passwdToCheck: string;

  constructor(private userService: UserService, public modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.editedUser = this.user;
  }

  saveUser() {
    if (this.checkPasswd() == false) {
      alert('As senhas são diferentes');
    } else {
      if (this.editedUser.picture == null) {
        this.editedUser.picture = '../../assets/dino.jpg';
      }
      this.userService.putUser(this.editedUser).subscribe((resp: User) => {
        this.user = resp;
        this.modalRef.hide();
        alert('Perfil atualizado!');
      });
    }
  }

  checkPasswd() {
    let ok = true;
    if (this.modifiedPasswd != null && this.passwdToCheck != null) {
      this.editedUser.passwd = this.modifiedPasswd;
      if (this.modifiedPasswd != this.passwdToCheck) {
        ok = false;
      }
    }
    return ok;
  }

  passwd(event: any) {
    this.modifiedPasswd = event.target.value;
  }

  passwdConfirm(event: any) {
    this.passwdToCheck = event.target.value;
  }
}
