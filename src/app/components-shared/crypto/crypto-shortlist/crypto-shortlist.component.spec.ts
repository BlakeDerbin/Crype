import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoShortlistComponent } from './crypto-shortlist.component';

describe('CryptoShortlistComponent', () => {
  let component: CryptoShortlistComponent;
  let fixture: ComponentFixture<CryptoShortlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoShortlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoShortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
