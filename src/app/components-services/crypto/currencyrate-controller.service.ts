import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import IcurrencyRate from "~app/components-services/crypto/IcurrencyRate";

@Injectable({
  providedIn: 'root'
})
export class CurrencyrateControllerService {
  currencyData: IcurrencyRate = new IcurrencyRate()
  readonly baseURL = 'https://api.exchangerate-api.com/v4/latest/'

  constructor(private http: HttpClient) { }

  currencyRate(): Observable<Array<IcurrencyRate>> {
    return this.http.get<Array<IcurrencyRate>>(this.baseURL + 'usd')
  }
}
