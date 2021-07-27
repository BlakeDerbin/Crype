import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { BreakpointObserver , Breakpoints } from "@angular/cdk/layout";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { KeyValue } from "@angular/common";
import IglobalStats from "~app/components-services/crypto/IglobalStats.model";


@Component({
  selector: 'app-crypto-marketstats',
  templateUrl: './crypto-marketstats.component.html',
  styleUrls: ['./crypto-marketstats.component.scss']
})
export class CryptoMarketstatsComponent implements OnInit {

  desktopView: boolean;
  globalStatsData = new Array<IglobalStats>();
  marketChangeData = [];
  destroyed = new Subject<void>();
  currentScreenSize: string = 'Large';

  // map for breakpoint names for mobile/desktop view
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
  ])

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute) {
    // on loading gets data from resolver, used to preload data
    this.globalStatsData.push((this.route.snapshot.data['stats'])['data'])
    this.marketChangeData = ((this.route.snapshot.data['stats'])['data']['market_cap_percentage'])

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
  }

  // Order by ascending property value, used to sort the order in crypto marketcap percentage
  valueAscOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return a.value.localeCompare(b.value);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
