import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CryptoList } from "~app/components-shared/crypto/crypto-search/crypto-list";
import { CryptoSearchService } from "~app/components-shared/crypto/crypto-search/crypto-search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crypto-searchbar',
  templateUrl: './crypto-searchbar.component.html',
  styleUrls: ['./crypto-searchbar.component.scss']
})
export class CryptoSearchbarComponent implements OnInit {
  searchInput = new FormControl();
  cryptoData = new Array<CryptoList>();
  filteredOptions: Observable<CryptoList[]>;
  subscription: Subscription;

  constructor(private service: CryptoSearchService, private router: Router) {
  }

  ngOnInit(): void {
    // fetches the data when loading the site
    this.subscription = this.service.fetchCryptoList().subscribe((list) => {
      console.log("getting data")
      this.cryptoData = list
    });
    // sets drop down options to display based on observing the input changes
    // options drop down is limited to display 5 results max
    this.filteredOptions = this.searchInput.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : [])
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // displays the data in the search dropdown
  displayData(crypto: CryptoList) {
    return crypto && crypto.name ? crypto.name : '';
  }

  // filters the cryptoData array starting with the input value, used for better performance
  private _filter(name: string): CryptoList[] {
    const filterValue = name.toLowerCase();
    return this.cryptoData.filter(option => option.name.toLowerCase().startsWith(filterValue));
  }

  // keyup enter event, triggers when user types a search and presses return/enter
  // will find the index of the form control input and redirect to the page using router
  searchRedirect() {
    const indexOfSearchInput = this.cryptoData.findIndex(val => val.name.toLowerCase() == this.searchInput.value.toLowerCase());
    const searchID = this.cryptoData[indexOfSearchInput];
    // TODO: fix the router navigation, navigates then defaults to unknown route, not currently working
    //return this.router.navigateByUrl('/details/'+searchID);
  }
}
