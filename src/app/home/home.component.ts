import { Component } from '@angular/core';

interface OfferCard {
  imgSrc: string;
  title: string;
  text: string;
  link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor() {}

  offerCards: OfferCard[] = [
    {
      imgSrc: '../assets/card-1.jpg',
      title: 'Handbags',
      text: 'MIN 40% OFF',
      link: ''
    },
    {
      imgSrc: '../assets/card-2.jpg',
      title: 'Sneakers',
      text: 'STARTING ₹1899',
      link: ''
    },
    {
      imgSrc: '../assets/card-3.jpg',
      title: 'Watches',
      text: 'FLAT 50% OFF',
      link: ''
    },
    {
      imgSrc: '../assets/card-4.jpg',
      title: 'Makeup',
      text: 'STARTING ₹500',
      link: ''
    }
  ];

}
