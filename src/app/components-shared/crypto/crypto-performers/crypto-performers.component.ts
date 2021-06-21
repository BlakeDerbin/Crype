import { Component, OnInit } from '@angular/core';
import { Subject, Subscription} from "rxjs";
import IcryptoMarket from "../../../components-services/crypto/ImarketData.model";
import { CryptoControllerService } from "../../../components-services/crypto/crypto-controller.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-crypto-performers',
  templateUrl: './crypto-performers.component.html',
  styleUrls: ['./crypto-performers.component.scss']
})
export class CryptoPerformersComponent implements OnInit {

  subscription: Subscription;
  cryptoData = new Array<IcryptoMarket>();
  desktopView: boolean;

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
          this.desktopView = !(["xSmall","Small"].includes(view));
        }
      }
    });
  }

  ngOnInit(): void {
    this.getTop3();
  }

  //**
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  //using observable get data from api
  getTop3() {
    this.subscription = this.service.getTop3Data().subscribe(data => {
      this.cryptoData = data;
    });
  }

}
