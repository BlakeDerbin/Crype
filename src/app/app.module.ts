import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModules } from "./components-shared/modules/material-module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CryptoModule } from "./components-shared/crypto/crypto.module";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from '@angular/flex-layout';
import { BackgroundComponent } from './components-shared/background/background.component';
import { BlockchainExplorerComponent } from './components-shared/blockchain-explorer/blockchain-explorer.component';
import { BlockchainSearchComponent } from './components-shared/blockchain-explorer/blockchain-search/blockchain-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BackgroundComponent,
    BlockchainExplorerComponent,
    BlockchainSearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    CryptoModule,
    MaterialModules
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
