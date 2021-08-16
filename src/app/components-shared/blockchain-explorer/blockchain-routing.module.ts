import { RouterModule, Routes } from "@angular/router";
import { BlockchainExplorerComponent } from "~app/components-shared/blockchain-explorer/blockchain-explorer.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'blockchainexplorer',
    component: BlockchainExplorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockchainRoutingModule { }


