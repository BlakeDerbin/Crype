import { Pipe, PipeTransform } from '@angular/core';
import {CryptoControllerService} from "~app/components-services/crypto/crypto-controller.service";
import {Subscription} from "rxjs";
import {CurrencyrateControllerService} from "~app/components-services/crypto/currencyrate-controller.service";

@Pipe({
  name: 'currencyConverter',
  pure: false
})
export class CurrencyConverterPipe implements PipeTransform {
  usdValue: number;
  value: string;
  currencySwitchEvent: Subscription;
  currencySubscription: Subscription;

  //subscribes to the currency event change and triggers the pipe transformation
  constructor(service: CryptoControllerService, currencyService: CurrencyrateControllerService) {
    this.usdValue == null || undefined ? this.usdValue = 1 : null;
    this.currencySwitchEvent = service.selectedCurrency.subscribe((currency) => {
      this.currencySubscription = currencyService.currencyRate().subscribe((data) => {
        this.usdValue = data['rates'][currency]
      });
      console.log(this.usdValue)
      this.transform(this.value)
    });
  }

  transform(value) {
    return Number(value) * this.usdValue;
  }

  ngOnDestroy() {
    this.currencySwitchEvent.unsubscribe();
    this.currencySubscription.unsubscribe();
  }
}
