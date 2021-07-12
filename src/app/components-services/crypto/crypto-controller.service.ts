import { EventEmitter, Injectable, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import IcryptoMarket from "./ImarketData.model";
import IcryptoDetails from "./IcryptoDetails.model";
import IglobalStats from "~app/components-services/crypto/IglobalStats.model";

@Injectable({
  providedIn: 'root'
})
export class CryptoControllerService {
  formData: IcryptoMarket = new IcryptoMarket();
  readonly baseURL = 'https://api.coingecko.com/api/v3/';

  selectedCurrency = new EventEmitter<string>();
  currency = "USD";

  private currencies: string[] = [
    "USD", "AUD", "NZD", "CAD"
  ]

  constructor(private http: HttpClient) { }

  currentCurrency(): string {
    return this.currency
  }

  getCurrencies() {
    // subscribes to event currency event and sets the currency on api calls
    this.selectedCurrency.subscribe(value => {this.currency = value})
    return this.currencies.slice();
  }

  getTop3Data(): Observable<Array<IcryptoMarket>> {
    return this.http.get<Array<IcryptoMarket>>(this.baseURL + 'coins/markets?vs_currency=' + this.currency + '&order=market_cap_desc&per_page=3&page=1&sparkline=false');
  }

  getMarketData(): Observable<Array<IcryptoMarket>> {
    return this.http.get<Array<IcryptoMarket>>(this.baseURL + 'coins/markets?vs_currency=' + this.currency + '&order=market_cap_desc&per_page=30&page=1&sparkline=false');
  }

  getCryptoDetails(id: string) {
    return this.http.get<Array<IcryptoDetails>>(this.baseURL + 'coins/' + id + '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true');
  }

  getGlobalMarketStats(): Observable<Array<IglobalStats>> {
    return this.http.get<Array<IglobalStats>>(this.baseURL + 'global')
  }
}
