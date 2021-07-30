import {Pipe, PipeTransform} from '@angular/core';
import {CryptoControllerService} from "~app/components-services/crypto/crypto-controller.service";
import {Subscription} from "rxjs";
import {CurrencyrateControllerService} from "~app/components-services/crypto/currencyrate-controller.service";

@Pipe({
  name: 'currencyConverter',
  pure: false
})
export class CurrencyConverterPipe implements PipeTransform {
  currencyValue: string;
  usdValue: number;
  value: number;
  operationSelect: string;

  //subscribes to the currency event change and triggers the pipe transformation
  constructor(service: CryptoControllerService, currencyService: CurrencyrateControllerService) {
    // used to set default to USD when opening/refreshing page
    !this.currencyValue ? this.currencyValue = "USD" : null;
    !this.usdValue ? this.usdValue = 1 : null;

    // subscribes whens the currency is switched
    service.selectedCurrency.subscribe((currency) => {
      currencyService.currencyRate().subscribe((data) => {
        this.currencyValue = currency
        this.usdValue = data['rates'][this.currencyValue]
      });
      this.transform(this.value)
    });
  }

  transform(numberInput, percent?: boolean) {
    if (!percent) {
      return numberInput * this.usdValue;
    }
    if (percent && this.currencyValue !== "USD") {
      let returnPercentage = (numberInput - this.usdValue) / (numberInput)
      return numberInput + (numberInput * (returnPercentage / 10))
    } else if (percent) {
      return numberInput
    }
  }
}
