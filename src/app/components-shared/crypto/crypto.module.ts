import { NgModule } from '@angular/core';
import { CryptoComponent } from "./crypto.component";
import { CryptoShortlistComponent } from "./crypto-shortlist/crypto-shortlist.component";
import { CryptoDetailsComponent } from "./crypto-details/crypto-details.component";
import { CommonModule } from "@angular/common";
import { MaterialModules } from "../modules/material-module";
import { CryptoRoutingModule } from "./crypto-routing.module";
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    CryptoComponent,
    CryptoShortlistComponent,
    CryptoDetailsComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    MaterialModules,
    NgApexchartsModule
  ]
})
export class CryptoModule { }
