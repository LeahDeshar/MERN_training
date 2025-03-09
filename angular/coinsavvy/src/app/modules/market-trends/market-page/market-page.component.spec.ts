import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPageComponent } from './market-page.component';

describe('MarketPageComponent', () => {
  let component: MarketPageComponent;
  let fixture: ComponentFixture<MarketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
