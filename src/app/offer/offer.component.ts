import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {OFFERS} from "../data/offers";

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
export class OfferComponent {

  protected readonly OFFERS = OFFERS;
}
