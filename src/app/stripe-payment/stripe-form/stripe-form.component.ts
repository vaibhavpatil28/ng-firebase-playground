import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StripeApiService } from '../stripe-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stripe-form',
  templateUrl: './stripe-form.component.html',
  styleUrls: ['./stripe-form.component.scss']
})
export class StripeFormComponent implements OnInit, AfterViewInit {
  stripeCard: import("@stripe/stripe-js").StripeCardElement;

  constructor(
    private stripeApiService: StripeApiService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    this.mountStripeCardElement();
  }

  ngOnInit(): void {
  }
  async mountStripeCardElement() {
    this.stripeCard = await this.stripeApiService.createStripeCardElement();

    // Add an instance of the card Element into the `card-element` <div>.
    this.stripeCard.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    this.stripeCard.on('change', this.errorHandlerCreateStripeCardElement);
  }
  errorHandlerCreateStripeCardElement = (event) => {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  }

  submitPayment(event) {
    event.preventDefault();
    this.confirmCardPayment();
    return;
    this.stripeApiService.createToken(this.stripeCard, (result) => {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        this.stripeTokenHandler(result.token);
      }
    });
  }
  async confirmCardPayment() {
    const paymentMethod = {
      payment_method: {
        card: this.stripeCard,
        billing_details: {
          name: 'Jenny Rosen'
        }
      }
    }
    const result = await this.stripeApiService.confirmCardPayment(paymentMethod);
    console.log('result: ', result);
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }
  // Submit the form with the token ID.
  stripeTokenHandler = (token) => {
    // Insert the token ID into the form so it gets submitted to the server
    var form: any = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    // form.submit();
    this.router.navigate(['payment/charge']);
  }

}
