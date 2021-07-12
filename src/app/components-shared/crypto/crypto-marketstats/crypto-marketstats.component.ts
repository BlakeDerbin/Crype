import { Component, OnInit } from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {CryptoControllerService} from "~app/components-services/crypto/crypto-controller.service";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import IglobalStats from "~app/components-services/crypto/IglobalStats.model";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-crypto-marketstats',
  templateUrl: './crypto-marketstats.component.html',
  styleUrls: ['./crypto-marketstats.component.scss']
})
export class CryptoMarketstatsComponent implements OnInit {

  subscription: Subscription;
  desktopView: boolean;
  globalStatsData = new Array<IglobalStats>();
  marketChangeData = new Array();
  destroyed = new Subject<void>();
  currentScreenSize: string = 'Large';

  // map for breakpoint names for mobile/desktop view
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
  ])

  constructor(private service: CryptoControllerService, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute) {
    // on loading gets data from resolver, used to preload data
    this.globalStatsData.push((this.route.snapshot.data['stats'])['data'])
    this.marketChangeData = ((this.route.snapshot.data['stats'])['data']['market_cap_percentage'])
    console.log(this.globalStatsData)

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
      () => {
        this.getEndpointData();
      }
    );
  }

  private getEndpointData() {
    this.service.getGlobalMarketStats().subscribe(data => {
        console.log("fetching global stats...")
        this.globalStatsData = []
        this.globalStatsData.push(data['data']);
        console.log(this.globalStatsData)
      },
      error => {
        console.error("error: can't fetch endpoint data!")
      }
    );
  }

  // Order by ascending property value, used to sort the order in crypto marketcap percentage
  valueAscOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return a.value.localeCompare(b.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }
}
