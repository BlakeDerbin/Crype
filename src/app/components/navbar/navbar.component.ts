import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  selectedCurrency: string;
  currencyUSD = "USD";
  currencyAUD = "AUD";

  constructor() { }

  ngOnInit(): void {
    this.selectedCurrency = this.currencyUSD;
  }

  changeCurrency(currency: string) {
    console.log(currency)
    this.selectedCurrency = currency
  }

}
