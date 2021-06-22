import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CryptoControllerService } from "~app/components-services/crypto/crypto-controller.service";

const currencies = {
  usd: "USD", aud: "AUD"
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currencies: string[];
  selectedCurrency: string;

  constructor(private service: CryptoControllerService) { }

  ngOnInit(): void {
    this.currencies = this.service.getCurrencies();
    this.selectedCurrency = currencies.usd;
  }

  changeCurrency(currency: string) {
    console.log(currency)
    //this.currencyOut.emit(currency)
    this.selectedCurrency = currency
    this.service.selectedCurrency.emit(this.selectedCurrency);
  }

}
