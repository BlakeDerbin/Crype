import { EventEmitter, Injectable, Output } from '@angular/core';
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
  @Output() notesDataEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  getMarketData(): Observable<Array<IcryptoMarket>> {
    return this.http.get<Array<IcryptoMarket>>(this.baseURL + '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
  }

  getCryptoDetails(id: string) {
    // uses the coingecko get api call for coins/id
    return this.http.get<Array<IcryptoDetails>>(this.baseURL + '/coins/' + id + '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true');
  }
}
