import { Component, OnInit } from '@angular/core';
import { Subject, Subscription} from "rxjs";
import IcryptoMarket from "../../../components-services/crypto/ImarketData.model";
import { CryptoControllerService } from "../../../components-services/crypto/crypto-controller.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { takeUntil } from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-crypto-performers',
  templateUrl: './crypto-performers.component.html',
  styleUrls: ['./crypto-performers.component.scss']
})
export class CryptoPerformersComponent implements OnInit {

  subscription: any;
  cryptoData = new Array<IcryptoMarket>();
  desktopView: boolean;
  currency = "USD"
  dataValues: any;

  //**
  destroyed = new Subject<void>();
  currentScreenSize: string = 'Large';

  //**
  // map for breakpoint names for mobile/desktop view
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
  ])

  //**
  constructor(private service: CryptoControllerService, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute) {
    // on loading gets data from resolver, used to preload data
    this.cryptoData = this.route.snapshot.data['list'].slice(0,3)

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
          this.desktopView = !(["xSmall","Small"].includes(view));
        }
      }
    });
  }

  ngOnInit(): void {
    // changes the currency type in the service
    this.subscription = this.service.selectedCurrency.subscribe(
      (currency: string) => {
        this.getEndpointData(currency);
      }
    );
  }

  private getEndpointData(currency: string) {
    this.service.getMarketData(currency).subscribe(data => {
      console.log("fetching top 3 data...")
      this.cryptoData = data.slice(0,3);
    },
      error => {
        console.error("error: can't fetch endpoint data!")
      }
    );
  }

  //**
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }
}
