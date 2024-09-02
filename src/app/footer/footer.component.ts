import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {LazyLoadImageModule} from "ng-lazyload-image";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    LazyLoadImageModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
