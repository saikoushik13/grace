import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksHeaderComponent } from './stocks-header.component';

describe('StocksHeaderComponent', () => {
  let component: StocksHeaderComponent;
  let fixture: ComponentFixture<StocksHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
