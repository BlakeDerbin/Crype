import { NgModule } from '@angular/core';
import { CryptoComponent } from "./crypto.component";
import { CryptoShortlistComponent } from "./crypto-shortlist/crypto-shortlist.component";
import { CryptoDetailsComponent } from "./crypto-details/crypto-details.component";
import { CommonModule } from "@angular/common";
import { MaterialModules } from "../modules/material-module";
import { CryptoRoutingModule } from "./crypto-routing.module";
import { NgApexchartsModule } from "ng-apexcharts";
import { CryptoPerformersComponent } from './crypto-performers/crypto-performers.component';
import { DetailsResolver } from "~app/components-shared/crypto/resolvers/details.resolver";
import { MarketDataResolver } from "~app/components-shared/crypto/resolvers/market-data.resolver";
import { CryptoSearchbarComponent } from './crypto-search/crypto-searchbar.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CryptoMarketstatsComponent } from './crypto-marketstats/crypto-marketstats.component';
import { MarketStatsResolver } from "~app/components-shared/crypto/resolvers/market-stats.resolver";

@NgModule({
  declarations: [
    CryptoComponent,
    CryptoShortlistComponent,
    CryptoDetailsComponent,
    CryptoPerformersComponent,
    CryptoSearchbarComponent,
    CryptoMarketstatsComponent
  ],
  exports: [
    CryptoPerformersComponent,
    CryptoShortlistComponent,
    CryptoComponent,
    CryptoSearchbarComponent
  ],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    MaterialModules,
    NgApexchartsModule,
    ReactiveFormsModule
  ],
  providers: [ DetailsResolver, MarketDataResolver, MarketStatsResolver ]
})
export class CryptoModule { }
