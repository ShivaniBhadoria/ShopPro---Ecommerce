import { Component } from '@angular/core';
import { OfferCard } from '../models/product.model';
import { ProductService } from '../services/product-list-data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  offerCards: OfferCard[] = [
    {
      imgSrc: '../assets/home/card-1.jpg',
      title: 'Handbags',
      text: 'MIN 40% OFF',
      link: 'shop',
      queryParams: { source: 'handbags-offer'}
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
    'BrightBox', 'PureWave', 'ClearLine', 'QuickPulse', 'SunnySide', 
    'BrightEra', 'ClearEdge', 'NextStep', 'VibeMax'
  ];

  constructor() {}


}
