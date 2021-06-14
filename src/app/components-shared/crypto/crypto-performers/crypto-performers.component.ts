import { Component, OnInit } from '@angular/core';
import {Observable, Subscribable, Subscription} from "rxjs";
import IcryptoMarket, {ImarketData} from "../../../components-services/crypto/ImarketData.model";
import {CryptoControllerService} from "../../../components-services/crypto/crypto-controller.service";

@Component({
  selector: 'app-crypto-performers',
  templateUrl: './crypto-performers.component.html',
  styleUrls: ['./crypto-performers.component.scss']
})
export class CryptoPerformersComponent implements OnInit {

  subscription: Subscription;
  cryptoData = new Array<IcryptoMarket>();

  constructor(public service: CryptoControllerService) { }

  ngOnInit(): void {
    this.getTop3();
  }

  //using observable get data from api
  getTop3() {
    this.subscription = this.service.getTop3Data().subscribe(data => {
      this.cryptoData = data;
    });
  }

}
