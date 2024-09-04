import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {OFFERS} from "../data/offers";

let bootstrap: any;

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent implements AfterViewInit,OnInit{

  protected readonly OFFERS = OFFERS;
  //@ViewChild('carousel', { static: false }) carousel!: ElementRef;
  ngAfterViewInit(){
  //  const carouselElement = this.carousel.nativeElement;
  //  new bootstrap.Carousel(carouselElement
  //  //  ,{
  //  //  interval: 500,
  //  //  ride: 'carousel',
  //  //  pause: 'active' // Pause carousel on hover
  //  //}
  //  );
  }

  ngOnInit(): void {
    document.getElementById("prev")?.click()
  }
}
