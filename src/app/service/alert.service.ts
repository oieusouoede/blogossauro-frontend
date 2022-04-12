import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertsComponent } from '../alerts/alerts.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private bsModalService: BsModalService) {}

  private showAlert(message: string, type: String) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertsComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  danger(message: string) {
    this.showAlert(message, 'danger');
  }

  success(message: string) {
    this.showAlert(message, 'success');
  }

  info(message: string) {
    this.showAlert(message, 'info');
  }
}
