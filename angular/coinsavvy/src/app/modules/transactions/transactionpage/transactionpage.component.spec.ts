import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionpageComponent } from './transactionpage.component';

describe('TransactionpageComponent', () => {
  let component: TransactionpageComponent;
  let fixture: ComponentFixture<TransactionpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
