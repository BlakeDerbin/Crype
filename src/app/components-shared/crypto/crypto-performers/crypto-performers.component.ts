import {Component, Directive, OnInit} from '@angular/core';
import {Observable, Subject, Subscribable, Subscription} from "rxjs";
import IcryptoMarket, {ImarketData} from "../../../components-services/crypto/ImarketData.model";
import {CryptoControllerService} from "../../../components-services/crypto/crypto-controller.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {takeUntil} from "rxjs/operators";

interface MediaQueryList extends EventTarget {
  matches: boolean; // => true if document matches the passed media query, false if not
  media: string; // => the media query used for the matching
}



@Component({
  selector: 'app-crypto-performers',
  templateUrl: './crypto-performers.component.html',
  styleUrls: ['./crypto-performers.component.scss']
})
export class CryptoPerformersComponent implements OnInit {

  subscription: Subscription;
  cryptoData = new Array<IcryptoMarket>();

  //**
  destroyed = new Subject<void>();
  currentScreenSize: string = 'Large';

  //**
  // create a map to display breakpoint names for demo
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
  ])

  viewMap = new Map([
    [Breakpoints.Handset, 'mobile'],
    [Breakpoints.Web, 'desktop']
  ])

  isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px');

  //**
  constructor(public service: CryptoControllerService, public breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
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

  //switch between mobile and desktop views
  switchViewMode() {
    const query = '(orientation: portrait)';
    const mediaQueryList = window.matchMedia(query);

    // define the callback function for our event listener
    function listener(mqs: MediaQueryList) {
      // checks the match
      if(mqs.matches) {
        console.log("portrait mode")
      } else {
        console.log("landscape mode")
      }
    }

    // run check once
    listener(mediaQueryList);

    // run check on every subsequent change
    // @ts-ignore
    mediaQueryList.addEventListener('change', listener);
  }

  //using observable get data from api
  getTop3() {
    this.subscription = this.service.getTop3Data().subscribe(data => {
      this.cryptoData = data;
    });
  }

}
