import {ChangeDetectorRef, Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  show = false;
  message: string = '';
  toastType: string = 'success'; // You can have different types like 'success', 'error'
  constructor() {}
  showToast(message: string, duration: number = 3000,toastType?:string) {
    this.message = message;
    this.toastType = toastType || 'success';
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, duration);
  }
}
