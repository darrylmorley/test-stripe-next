import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { id, amount } = req.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'GBP',
      description: 'Test Item',
      payment_method: id,
      confirm: true
    })

    console.log(payment)

    return res.status(200).json({
      confirm: 'abc123'
    })
  } catch (error) {
    console.error(error)
  }
}