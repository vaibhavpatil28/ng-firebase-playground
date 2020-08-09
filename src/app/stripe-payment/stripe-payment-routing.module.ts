import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StripeFormComponent } from './stripe-form/stripe-form.component';
import { PaymentRequestBtnComponent } from './payment-request-btn/payment-request-btn.component';


const routes: Routes = [
    { path: '', component: StripeFormComponent },
    { path: 'charge', component: PaymentRequestBtnComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StripePaymentRoutingModule { }
