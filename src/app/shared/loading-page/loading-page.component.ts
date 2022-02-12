import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {
  @Input() searchMart: any;
  @Input() searchProduct: any;

  constructor() { }

  shoppingQuotes = [
    "No decision should be made on an empty shopping bag.",
    "If shopping doesn't make you happy, then you're in the wrong shop.",
    "Cinderella is proof that a new pair of shoes can change your life.",
    "Take all your problems And rip 'em apart Oh oh oh Carry them off In a shopping cart",
    "Three things to remember about shopping are location, location, location."
  ];

  testSearchData = 'D mart, jio mart, bigbazzar';
  testSearchProduct = 'Sugar';

  randomQuote: string;

  ngOnInit(): void {
    console.log(this.searchMart);
    console.log(this.searchProduct);
    this.setRandomQuote();
  }

  setRandomQuote() {
    this.randomQuote = this.shoppingQuotes[Math.floor(Math.random() * (this.shoppingQuotes.length - 1)) + 1];
    console.log(this.randomQuote);
  }

}
