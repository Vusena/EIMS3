import { Component } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss'
})
export class CustomModalComponent {
  confirm!: Modal

  openModal(confirm: HTMLElement) {
    this.confirm = new Modal(confirm)
    this.confirm.show();
  }
}
