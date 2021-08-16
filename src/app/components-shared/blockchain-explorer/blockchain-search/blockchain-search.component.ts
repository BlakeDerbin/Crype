import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-blockchain-search',
  templateUrl: './blockchain-search.component.html',
  styleUrls: ['./blockchain-search.component.scss']
})
export class BlockchainSearchComponent implements OnInit {

  blockSearch = new FormControl()

  constructor() { }

  ngOnInit(): void {
  }

}
