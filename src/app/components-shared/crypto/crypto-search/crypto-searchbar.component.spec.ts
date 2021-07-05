import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoSearchbarComponent } from './crypto-searchbar.component';

describe('CryptoSearchbarComponent', () => {
  let component: CryptoSearchbarComponent;
  let fixture: ComponentFixture<CryptoSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
