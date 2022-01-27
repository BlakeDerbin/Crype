import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCandleChartComponent } from './crypto-candle-chart.component';

describe('CryptoCandleChartComponent', () => {
  let component: CryptoCandleChartComponent;
  let fixture: ComponentFixture<CryptoCandleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoCandleChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCandleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
