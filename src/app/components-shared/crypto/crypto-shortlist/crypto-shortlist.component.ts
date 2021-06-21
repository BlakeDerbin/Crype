import { Component, OnInit, ViewChild } from '@angular/core';
import IcryptoMarket from "../../../components-services/crypto/ImarketData.model";
import {Subject, Subscription} from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { CryptoControllerService } from "../../../components-services/crypto/crypto-controller.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {takeUntil} from "rxjs/operators";

export const cryptoColumnsDesktop: string[] = [
  'market_cap_rank', 'name', 'symbol', 'price_change_percentage_24h',
  'price_change_24h', 'current_price', 'market_cap_change_percentage_24h',
  'market_cap', 'circulating_supply', 'total_supply', 'max_supply', 'id'
]

export const cryptoColumnsMobile: string[] = [
  'market_cap_rank', 'symbol', 'price_change_percentage_24h', 'current_price'
]

@Component({
  selector: 'app-crypto-shortlist',
  templateUrl: './crypto-shortlist.component.html',
  styleUrls: ['./crypto-shortlist.component.scss']
})
export class CryptoShortlistComponent implements OnInit {

  triangleChange = "./../../../shared/style/images/tri_change.svg"
  displayedColumns: string[];
  selectedCurrency = 'usd';
  selectedCrypto!: IcryptoMarket;
  dataSource = new MatTableDataSource<IcryptoMarket>();
  subscription: Subscription;
  dataValues = new Array<IcryptoMarket>();

  //**
  destroyed = new Subject<void>();
  currentScreenSize: string = 'Large';
  desktopView: boolean;

  //**
  // map for breakpoint names for mobile/desktop view
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'xLarge']
  ])

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(public service: CryptoControllerService, public breakpointObserver: BreakpointObserver) {
    this.desktopView = true;

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          const view = this.displayNameMap.get(query)
          if (["xSmall", "Small"].includes(view)) {
            this.desktopView = false;
            this.displayedColumns = cryptoColumnsMobile;
          } else {
            this.displayedColumns = cryptoColumnsDesktop;
            this.desktopView = true;
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  //**
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  //using observable get data from api
  getData() {
    this.subscription = this.service.getMarketData().subscribe(data => {
      console.log("Fetching data...")
      this.dataSource.data = data;
      this.dataValues = data;
      //this.logData();
    },
      error => {
        console.log("Data can't be fetched, no connection!")
      }
      );
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
