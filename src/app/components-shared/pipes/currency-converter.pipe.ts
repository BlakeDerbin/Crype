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
  value: string;
  operationSelect: string;
  currencySwitchEvent: Subscription;
  currencySubscription: Subscription;

  //subscribes to the currency event change and triggers the pipe transformation
  constructor(service: CryptoControllerService, currencyService: CurrencyrateControllerService) {
    // used to set default to USD when opening/refreshing page
    !this.currencyValue ? this.currencyValue = "USD" : null;
    !this.usdValue ? this.usdValue = 1 : null;

    // subscribes whens the currency is switched
    this.currencySwitchEvent = service.selectedCurrency.subscribe((currency) => {
      this.currencySubscription = currencyService.currencyRate().subscribe((data) => {
        this.currencyValue = currency
        this.usdValue = data['rates'][this.currencyValue]
      });
      this.transform(this.value)
    });
  }

  transform(value, percent?: boolean) {
    console.log("value: ", value, this.usdValue)
    if (!percent) {
      return Number(value) * this.usdValue;
    }
    if (percent && this.currencyValue !== "USD") {
      let inputValue: number = value
      let returnPercentage = (inputValue - this.usdValue) / (inputValue)
      returnPercentage = inputValue * returnPercentage / 10
      console.log("return percent: ", inputValue + returnPercentage)
      return inputValue + returnPercentage
    } else if (percent) {
      console.log("in: ", value)
      return value
    }
  }

  ngOnDestroy() {
    //this.currencySwitchEvent.unsubscribe();
    //this.currencySubscription.unsubscribe();
  }
}
