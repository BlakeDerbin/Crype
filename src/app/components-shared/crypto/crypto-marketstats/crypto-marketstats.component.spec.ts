import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoMarketstatsComponent } from './crypto-marketstats.component';

describe('CryptoMarketstatsComponent', () => {
  let component: CryptoMarketstatsComponent;
  let fixture: ComponentFixture<CryptoMarketstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoMarketstatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoMarketstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
