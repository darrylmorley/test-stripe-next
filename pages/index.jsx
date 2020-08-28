import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault(); 
 
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const res = await axios.post('api/charge', {
          id, 
          amount: 1099
        })
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:"400px", margin: "0 auto" }}>
      <h2>Some Stuff</h2>
      <p>£10.99</p>
      <CardElement />
      <button type="submit" disabled={!stripe} style={{ marginTop: "10px" }}>Pay Now</button>
    </form>)
};

const stripePromise = loadStripe('pk_test_51HEammBp7A8OVVo2dKNGYHphBZZFkuY7Y1vDa8HyhZZbIWfJIDUErroCFFKjXycxpevmsuo9btCg7bJKpWpm2MSF00LWtktDET')

export default function Home() {
  return (
    <Elements stripe={stripePromise}>
      <h1 style={{ maxWidth:"180px", margin: "0 auto", marginTop: "20px", marginBottom:"50px" }}>Stripe Test</h1>
      <CheckoutForm />
    </Elements>
  )
}
