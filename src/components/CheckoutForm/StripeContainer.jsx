import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm'
const PUBLIC_KEY="pk_test_51O8DXGKvrB6fpE6lEKSleVz2fJGfTfLNnrgQtNio9fPPblJPnSaCQFcPRmVkPfaKqd1SEQDIlOh48Z62cQdwD2ut00BzvMxTht"

const stripeTestPromise= loadStripe(PUBLIC_KEY)
export default function StripeContainer() {
  return (
<Elements stripe={stripeTestPromise}>
    <PaymentForm/>
</Elements>
  )
}
