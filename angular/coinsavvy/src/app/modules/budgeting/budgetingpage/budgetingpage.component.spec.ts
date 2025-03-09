import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetingpageComponent } from './budgetingpage.component';

describe('BudgetingpageComponent', () => {
  let component: BudgetingpageComponent;
  let fixture: ComponentFixture<BudgetingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetingpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
