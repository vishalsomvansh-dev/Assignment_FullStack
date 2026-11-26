# E-commerce application starter

This is a learning scaffold for an MCA practical. It includes product listing, cart, checkout order creation, order history, and seller product management. It intentionally uses a **mock checkout**; do not collect real card details or treat an order as paid. For real payments, create a server-side payment order with a provider such as Razorpay/Stripe, verify its signature on the server, and never expose secret keys in frontend code.

## Run
- `npm install`
- Copy `.env.example` to `.env` and set MongoDB URI.
- `npm start`
- Open http://localhost:3000

The demo uses a simple shared seller panel without authentication. Add authentication, authorization, input validation, stock handling, and payment verification before production.