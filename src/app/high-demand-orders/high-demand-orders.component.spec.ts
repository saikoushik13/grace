import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighDemandOrdersComponent } from './high-demand-orders.component';

describe('HighDemandOrdersComponent', () => {
  let component: HighDemandOrdersComponent;
  let fixture: ComponentFixture<HighDemandOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighDemandOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighDemandOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
