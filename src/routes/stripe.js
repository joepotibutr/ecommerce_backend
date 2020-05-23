import express from 'express'
import Stripe from 'stripe'

const router = express.Router()

const stripeCharge = new Stripe(process.env.STRIPE_SECRET)


async function postCharge(req, res) {
    try {
      const { amount, source, receipt_email } = req.body
      
      const charge = await stripeCharge.charges.create({
        amount,
        currency: 'usd',
        source,
        receipt_email
      })
  
      if (!charge) throw new Error('charge unsuccessful')
      
      res.status(200).json({
        message: 'charge posted successfully',
        charge
      })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }

  
router.post('/charge', postCharge)

  
export default router 
  