// Easiest local payment options: set your handles below.
// Examples:
// paypalMe: 'YourPayPalMeName'   -> https://paypal.me/YourPayPalMeName/{amount}
// cashTag:  'YourCashTag'        -> https://cash.app/$YourCashTag/{amount}
// venmo:    'YourVenmoUser'      -> https://venmo.com/YourVenmoUser?txn=pay&amount={amount}

const payments = {
  paypalMe: '',
  cashTag: '',
  venmo: '',
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  backendCheckoutUrl: import.meta.env.VITE_BACKEND_CHECKOUT_URL || '',
}

export default payments


