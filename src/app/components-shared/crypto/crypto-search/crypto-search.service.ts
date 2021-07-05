import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CryptoList} from "~app/components-shared/crypto/crypto-search/crypto-list";

@Injectable({
  providedIn: 'root'
})
export class CryptoSearchService {
  readonly baseURL = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  fetchCryptoList(): Observable<Array<CryptoList>> {
    return this.http.get<Array<CryptoList>>(`${this.baseURL}/coins/list`)
  }
}
