Project Title & Overview
# Gadget Store (E-commerce App)

This is a simple e-commerce web application built with Next.js.  
Users can browse products, add items to cart, and complete payments using Paystack (test mode).

Tech Stack & Justification (IMPORTANT)
## Tech Stack

- **Next.js (App Router)**  
  Used for routing, page rendering, and production-ready deployment.

- **TypeScript**  
  Provides type safety and prevents runtime errors.

- **React Query (TanStack Query)**  
  Handles data fetching, caching, and loading states for products.

- **Zod**  
  Used for form validation during checkout to ensure correct user input.

- **Paystack (Test Mode)**  
  Handles secure online payments.

- **Vanilla CSS**  
  Used for styling to keep the project simple and framework-agnostic.

- **Vercel**  
  Used for hosting and deployment due to seamless Next.js support.



  Setup Instructions (VERY IMPORTANT)
## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/drvickie/ecommerce-store.git
cd ecommerce-store

Install Dependencies 
npm install

Create Environment Variables
Create a .env.local file in the root directory:
NEXT_PUBLIC_PAYSTACK_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
Make sure the key starts with pk_test_

Run the Development Server
npm run dev
Open:
http://localhost:3000

Payment Flow Explanation (MANDATORY)
## Payment Flow

1. User adds products to the cart.
2. User proceeds to the checkout page.
3. Checkout form is validated using Zod.
4. Paystack payment modal opens in test mode.
5. User completes payment using a Paystack test card.
6. On successful payment:
   - Cart is cleared
   - User is redirected to the confirmation page
   - Transaction reference is displayed

Test Card Details (Nice Touch)
## Paystack Test Card

Use the following test card to simulate payments:

- Card Number: 408 408 408 408 408 1
- Expiry Date: Any future date
- CVV: 408
- PIN: 0000
- OTP: 123456


Deployment Link Section
## Deployment

The application is deployed on Vercel using Paystack in test mode.

Live URL:
https://ecommerce-store-7jm5nyzte-victorias-projects-48dc6b56.vercel.app/
