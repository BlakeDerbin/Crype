import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { CryptoComponent } from "./crypto.component";
import { CryptoDetailsComponent } from './crypto-details/crypto-details.component';
import { DetailsResolver } from "~app/components-shared/crypto/resolvers/details.resolver";
import { MarketDataResolver } from "~app/components-shared/crypto/resolvers/market-data.resolver";

const routes: Routes = [
  {
    path: 'details/:id',
    component: CryptoDetailsComponent,
    resolve: {
      details: DetailsResolver
    }
  },
  {
    path: 'home',
    component: CryptoComponent,
    resolve: {
      list: MarketDataResolver,
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoRoutingModule { }
