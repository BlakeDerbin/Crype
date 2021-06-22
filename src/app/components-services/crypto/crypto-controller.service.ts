import { EventEmitter, Injectable, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import IcryptoMarket from "./ImarketData.model";
import IcryptoDetails from "./IcryptoDetails.model";

@Injectable({
  providedIn: 'root'
})
export class CryptoControllerService {
  formData: IcryptoMarket = new IcryptoMarket();
  readonly baseURL = 'https://api.coingecko.com/api/v3';

  defaultCurrency = 'usd';
  selectedCurrency = new EventEmitter<String>();

  private currencies: string[] = [
    "USD", "AUD", "NZD"
  ]

  constructor(private http: HttpClient) {
  }

  getCurrencies() {
    return this.currencies.slice();
  }

  getTop3Data(currency: string): Observable<Array<IcryptoMarket>> {
    // if currency is undefined or null set default to USD
    ([null,undefined].includes(currency)) ? currency = "USD" : currency

    return this.http.get<Array<IcryptoMarket>>(this.baseURL + '/coins/markets?vs_currency=' + currency + '&order=market_cap_desc&per_page=3&page=1&sparkline=false');
  }

  getMarketData(currency: string): Observable<Array<IcryptoMarket>> {
    // if currency is undefined or null set default to USD
    ([null,undefined].includes(currency)) ? currency = "USD" : currency

    return this.http.get<Array<IcryptoMarket>>(this.baseURL + '/coins/markets?vs_currency=' + currency + '&order=market_cap_desc&per_page=20&page=1&sparkline=false');
  }

  getCryptoDetails(id: string) {
    return this.http.get<Array<IcryptoDetails>>(this.baseURL + '/coins/' + id + '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true');
  }
}
