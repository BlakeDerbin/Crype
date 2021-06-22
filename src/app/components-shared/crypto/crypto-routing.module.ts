import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { CryptoComponent } from "./crypto.component";
import { CryptoDetailsComponent } from './crypto-details/crypto-details.component';
import { DetailsResolver } from "~app/components-shared/crypto/resolvers/details.resolver";

const routes: Routes = [
  {
    path: '',
    component: CryptoComponent
  },
  {
    path: 'details/:id',
    component: CryptoDetailsComponent,
    resolve: {
      details: DetailsResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoRoutingModule { }
