import { Component, OnInit } from '@angular/core';
import { StripeApiService } from '../stripe-api.service';

@Component({
  selector: 'app-payment-request-btn',
  templateUrl: './payment-request-btn.component.html',
  styleUrls: ['./payment-request-btn.component.scss']
})
export class PaymentRequestBtnComponent implements OnInit {

  constructor(
    private stripeApiService: StripeApiService
  ) { }

  ngOnInit(): void {
    this.paymentRequestButton();
  }
  paymentRequestButton() {
    const elements = this.stripeApiService.elements;
    console.log('elements: ', elements);
    const paymentRequest = this.stripeApiService.paymentRequest();
    console.log('paymentRequest: ', paymentRequest);
    const prButton = elements.create('paymentRequestButton', {
      paymentRequest,
    });
    console.log('prButton: ', prButton);

    (async () => {
      // Check the availability of the Payment Request API first.
      const result = await paymentRequest.canMakePayment();
      console.log('result: ', result);
      if (result) {
        prButton.mount('#payment-request-button');
      } else {
        document.getElementById('payment-request-button').style.display = 'none';
      }
    })();
  }

}
