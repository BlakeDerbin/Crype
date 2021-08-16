import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainSearchComponent } from './blockchain-search.component';

describe('BlockchainSearchComponent', () => {
  let component: BlockchainSearchComponent;
  let fixture: ComponentFixture<BlockchainSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockchainSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
