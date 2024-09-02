import { Component } from '@angular/core';
import {LazyLoadImageModule} from "ng-lazyload-image";

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [
    LazyLoadImageModule
  ],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

}
