import { Injectable } from '@angular/core';
/* server side module */
// import Stripe from 'stripe';

/* Client side module*/
import { loadStripe, StripeElements } from '@stripe/stripe-js';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class StripeApiService {

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  private style = {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };
  stripe: import("@stripe/stripe-js").Stripe;
  private _elements: StripeElements;
  clientSecret: string;

  constructor() { }

  private async createStripeClient() {
    // Create a Stripe client.replace below string with your strape public key.
    this.stripe = await loadStripe('pk_test_51HBGdaIikNnb5zwatFz7Ag48vYh7ADvOxEu');
  }

  private async createStripeElements() {
    // Create an instance of Elements.
    await this.createStripeClient();
    this._elements = this.stripe.elements();
    return this._elements;
  }

  public get elements(): StripeElements {
    return this._elements;
  }


  async createStripeCardElement(style = this.style) {
    const elements = await this.createStripeElements();
    // Create an instance of the card Element.
    return elements.create('card', { style: style });
  }
  async createToken(card, handlerFn) {
    const result = await this.stripe.createToken(card);
    handlerFn(result);
  }

  /* implement on server-side */
  // async paymentIntent() {
  //   const stripe = new Stripe('pk_test_51HBGdaIikNnb5zwatFz7Ag48vYh7ADvOxEuP4TAXYMkdhwM1ccXoslw9LhBVyebWq6AuffUUASfdcZvBAnV2Nyk900lqNErXNG', null);

  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: 1099,
  //     currency: 'inr',
  //     // Verify your integration in this guide by including this parameter
  //     metadata: { integration_check: 'accept_a_payment' },
  //   });
  //   return { client_secret: paymentIntent.client_secret };
  // }
  async getClientScret() {
      const response = await fetch('http://localhost:3000/stripe/secret');
      const {client_secret: clientSecret} = await response.json();
      // Call stripe.confirmCardPayment() with the client secret.
      return clientSecret;
  }

  confirmCardPayment(paymentMethod) {
    
    return (async ()=>{
      const clientSecret = await this.getClientScret();
      return this.stripe.confirmCardPayment(clientSecret, paymentMethod);
    })();
  }

  paymentRequest() {
    const paymentRequest = this.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1099,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    return paymentRequest;
  }
}
