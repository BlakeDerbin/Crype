import { Component, OnInit, ViewChild } from '@angular/core';
import IcryptoMarket from "../../../components-services/crypto/ImarketData.model";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { CryptoControllerService } from "../../../components-services/crypto/crypto-controller.service";

export const cryptoColumns: string[] = [
  'market_cap_rank', 'name', 'symbol', 'price_change_percentage_24h',
  'price_change_24h', 'current_price', 'market_cap_change_percentage_24h',
  'market_cap', 'circulating_supply', 'total_supply', 'max_supply', 'id'
]

@Component({
  selector: 'app-crypto-shortlist',
  templateUrl: './crypto-shortlist.component.html',
  styleUrls: ['./crypto-shortlist.component.scss']
})
export class CryptoShortlistComponent implements OnInit {

  displayedColumns = cryptoColumns;
  selectedCurrency = 'usd';
  selectedCrypto!: IcryptoMarket;
  dataSource = new MatTableDataSource<IcryptoMarket>();
  subscription: Subscription;
  dataValues = new Array<IcryptoMarket>();

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(public service: CryptoControllerService) { }

  ngOnInit(): void {
    this.getData();
  }

  //using observable get data from api
  getData() {
    this.subscription = this.service.getMarketData().subscribe(data => {
      this.dataSource.data = data;
      this.dataValues = data;
      //this.logData();
    });
  }

  logData() {
    this.dataValues.forEach(val => {
      console.log('===', val);
    })
  }

  onSelectDetails(crypto: IcryptoMarket): void {
    this.selectedCrypto = crypto;
  }
}
