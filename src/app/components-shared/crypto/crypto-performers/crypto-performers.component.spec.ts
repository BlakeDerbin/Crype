import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoPerformersComponent } from './crypto-performers.component';

describe('CryptoPerformersComponent', () => {
  let component: CryptoPerformersComponent;
  let fixture: ComponentFixture<CryptoPerformersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoPerformersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoPerformersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
