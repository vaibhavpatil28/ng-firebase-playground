import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeFormComponent } from './stripe-form/stripe-form.component';
import { StripeApiService } from './stripe-api.service';
import { StripePaymentRoutingModule } from './stripe-payment-routing.module';
import { PaymentRequestBtnComponent } from './payment-request-btn/payment-request-btn.component';



@NgModule({
  declarations: [StripeFormComponent, PaymentRequestBtnComponent],
  imports: [
    CommonModule,
    StripePaymentRoutingModule
  ],
  providers: [StripeApiService],
  entryComponents: [StripeFormComponent],
  exports:[StripeFormComponent]
})
export class StripePaymentModule { }
