import { Component } from '@angular/core';
import { OfferCard } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  offerCards: OfferCard[] = [
    {
      imgSrc: '../assets/home/card-1.jpg',
      title: 'Purses',
      text: 'MIN 40% OFF',
      link: 'shop',
      queryParams: { source: 'purses-offer'}
    },
    {
      imgSrc: '../assets/home/card-2.jpg',
      title: 'Sneakers',
      text: 'STARTING ₹1899',
      link: 'shop', 
      queryParams: { source: 'shoes-offer'}
    },
    {
      imgSrc: '../assets/home/card-3.jpg',
      title: 'Watches',
      text: 'FLAT 50% OFF',
      link: 'shop',
      queryParams: { source: 'watches-offer'}
    },
    {
      imgSrc: '../assets/home/card-4.jpg',
      title: 'Makeup',
      text: 'STARTING ₹500',
      link: 'shop',
      queryParams: { source: 'makeup-offer'}
    }
  ];

  brandNames: string[] = [
    'BrightBox', 'PureWave', 'BrightEra', 'QuickPulse', 'SunnySide', 
    'ClearLine', 'ClearEdge', 'NextStep', 'VibeMax'
  ];

  logos = this.brandNames.map(name => ({
    name,
    imageUrl: `../assets/brand-logos/${name.toLowerCase()}.png`
  }));

  constructor() {}

}
