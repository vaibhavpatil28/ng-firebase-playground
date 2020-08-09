import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRequestBtnComponent } from './payment-request-btn.component';

describe('PaymentRequestBtnComponent', () => {
  let component: PaymentRequestBtnComponent;
  let fixture: ComponentFixture<PaymentRequestBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRequestBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRequestBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
