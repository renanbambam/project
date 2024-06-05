import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePaymentComponent } from './invoice-payment.component';

describe('InvoicePaymentComponent', () => {
  let component: InvoicePaymentComponent;
  let fixture: ComponentFixture<InvoicePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicePaymentComponent]
    });
    fixture = TestBed.createComponent(InvoicePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
