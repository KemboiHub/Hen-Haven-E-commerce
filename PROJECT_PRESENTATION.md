# Hen Haven — Project Presentation

## Overview

Hen Haven is a small e-commerce single-page application (SPA) focused on poultry products: day-old chicks, growing birds, production-ready birds, feeds, vaccines, and related supplies. The project has two main parts:

- Front-end: a Vite + React + TypeScript single-page app with Tailwind CSS for styling.
- Backend: a Node.js + Express service that integrates with Safaricom M-Pesa Daraja APIs (STK Push) for payments.

This presentation explains the architecture, key components, data flows, setup and build, and suggested talking points for a technical interview/demo.

---

## Elevator pitch (1–2 sentences)

Hen Haven provides a polished, mobile-first storefront for poultry farmers and hobbyists. It demonstrates a practical e-commerce UX (product browsing, cart, checkout) and real-world payment integration (M-Pesa STK Push) with clean code organization and local-first auth simulation for quick demos.

---

## Tech stack

- Frontend
  - React (18.x) with TypeScript
  - Vite for development & bundling
  - Tailwind CSS for utility-first styling
  - lucide-react for icons
  - Local state via React Contexts (Cart and Auth)

- Backend
  - Node.js + Express
  - Axios and moment for HTTP and time formatting
  - MPesa Daraja (STK Push) integration

- Tooling
  - npm scripts: `dev`, `build`, `preview` for the front-end
  - Local demo usage stores demo users in `localStorage`

Why these choices?
- Vite + React + TypeScript => fast dev feedback, strong DX
- Tailwind => consistent, utility-first styling without custom CSS boilerplate
- Node/Express for backend => lightweight server to handle Daraja flow and callbacks

---

## High-level architecture

- Single-page React app (`Front-end/src/App.tsx`) implements a section-based navigation model. It renders different "pages" by switching the `currentSection` state.
- Shared application state is provided via React Contexts:
  - `CartContext` manages cart items, quantities and computes the total in a robust manner (parses currency strings).
  - `AuthContext` provides a local mock authentication (saves users in localStorage, stores the logged-in user in localStorage as well).
- Header component (`Header.tsx`) orchestrates navigation and exposes search, cart, user/login UI and payment flow triggers.
- Backend (`Backend/app.js`, `Backend/api.js`) provides endpoints used for M-Pesa STK Push. The frontend calls `/api/mpesa/stkpush` (in the app the Header sends the request to `http://localhost:5000/api/mpesa/stkpush`) to initiate the payment.
- STK push sequence (high level): Frontend -> Backend `/api/stkpush` -> Daraja STK push -> User completes via phone -> Daraja sends callback -> Backend writes callback JSON to `stkcallback.json`.

Component diagram (text):

Frontend UI (React) -> CartContext/AuthContext -> Header actions (Checkout) -> Backend API -> M-Pesa Daraja -> Callback -> Backend stores callback

---

## Key files and responsibilities

- Front-end
  - `src/App.tsx` — Application entry: manages `currentSection`, navigation helpers (`navigateToSection`, `goBack`) and renders sections conditionally. Also contains the `FeedsSection` local component.
  - `src/components/Header.tsx` — Top navigation, search, cart dropdown, login modal hook-up, payment form UI and STK push POST handler. Handles checkout validation and triggers the payment form.
  - `src/components/Hero.tsx` — Landing hero with prominent CTA (Shop Now). The CTA now calls `navigateToSection('shop')` to show the shop.
  - `src/components/CategorySection.tsx` — The shop: categories, product modals, add-to-cart flows, and an internal modal to select options and quantity.
  - `src/components/Cart.tsx` — (Component present) Cart view used when `currentSection === 'cart'`.
  - `src/context/CartContext.tsx` — Cart state (add/remove/update/clear), `useCart()` hook, and `total` memoization with price parsing.
  - `src/context/AuthContext.tsx` — Local auth provider with `login`, `signup`, and `logout`. Stores users in `localStorage` (`henHavenUsers`) and session in `currentUser`.

- Backend
  - `Backend/app.js` — Express server: sets up endpoints, provides a legacy set of example routes (access token, stkpush, callback, registerurl) and listens on port 5000.
  - `Backend/api.js` — Organized router with API endpoints and a focused STK push implementation and callback processing. Writes `stkcallback.json` with Daraja callback result.

---

## Important implementation details & code notes

- Section navigation (no react-router): `App.tsx` uses a `currentSection` string state. `navigateToSection('shop')` causes `renderSection()` to render the shop-specific components or scroll to elements with matching ids.
  - Pros: simple, no routing dependency; good for small promo sites.
  - Cons: no deep links (URLs don't change), not SEO-friendly for server-side rendered content.

- Cart total computation: `CartContext` parses price strings into numbers (strips non-numeric chars) before multiplication, then uses `useMemo` for performance.

- Auth: simulated locally with `localStorage` users. Convenient for demos, but not secure for production. Signup flow stores a `password` in localStorage for demo purposes.

- Payment flow (STK Push): the UI prepares the phone and amount and sends a POST to the backend `api/stkpush`. The backend performs proper auth with Daraja (consumer key/secret; the code contains placeholders/hard-coded sandbox credentials) and POSTs to Daraja's STK Push processrequest endpoint. Callback handling writes the callback body to `stkcallback.json`.

- Error handling and UX:
  - `Header` validates the user phone format before checkout (expects Kenyan `2547XXXXXXXX`). If missing or invalid it forces login/profile update.
  - `PaymentForm` shows success/failure messages after calling the backend.

---

## How to run locally (PowerShell commands)

1. Frontend (development):

```powershell
cd 'c:\Users\KEMBOI\Desktop\FILES\Hen Haven\Hen-Haven-E-commerce\Front-end'
npm install
npm run dev
```

2. Frontend (build):

```powershell
cd 'c:\Users\KEMBOI\Desktop\FILES\Hen Haven\Hen-Haven-E-commerce\Front-end'
npm run build
npm run preview   # optional to preview the production build locally
```

3. Backend (development):

```powershell
cd 'c:\Users\KEMBOI\Desktop\FILES\Hen Haven\Hen-Haven-E-commerce\Backend'
npm install
node app.js
# or use nodemon if available for hot reload
```

Note: The backend uses sandbox Daraja credentials that are currently hard-coded. For real STK pushes you must replace the consumer key/secret in `app.js` and `api.js` with your own from Safaricom.

If you run the frontend and backend locally, update the fetch URL in `Header.tsx` `PaymentForm` to point to the backend (currently it calls `http://localhost:5000/api/mpesa/stkpush` in the Header component — verify correct path based on your environment).

---

## Demo script (what to show during interview)

1. Show the homepage and hero section. Click "Shop Now". Demonstrate the navigation (section-based).
2. Browse categories in the Shop. Open a product modal, choose options (age, breed), add to cart.
3. Open the cart (shopping cart icon in header). Show quantity adjustment and removal.
4. Attempt checkout while not logged in — show that it prompts for login.
5. Use demo credentials (e.g., `john.doe@example.com` / `password123`) and sign in. Show persistent session in `localStorage`.
6. With an account that has a phone number, click Checkout and show the M-Pesa payment modal. (If you have a Daraja sandbox account and ngrok or publicly accessible callback URL configured, demonstrate STK push live.)
7. Show the backend `stkcallback.json` being written after a successful STK push callback (if live demo is set up).

---

## Security & production considerations

- Do NOT store passwords in `localStorage` in production. Use secure session handling (HTTP-only cookies or JWTs stored securely).
- Replace sandbox credentials with environment variables. Never commit secrets to source control.
  - Example: use `process.env.DARAJA_CONSUMER_KEY` and `process.env.DARAJA_CONSUMER_SECRET` and load via `.env` in Express.
- Validate and sanitize all request input on the backend.
- Use HTTPS and proper CORS configuration for production.
- Implement rate limiting and webhooks verification for M-Pesa callbacks.

---

## Edge cases & robustness

- Cart price parsing is defensive (strips non-digits), but production should store numeric prices (cents/paisa) and format on render.
- Phone number validation is strict (expects `2547XXXXXXXX`) — consider more forgiving parsing and a normalization utility.
- Offline/slow network behaviors: add optimistic UI for cart updates and proper loading states for STK push flows.

---

## Suggested improvements (short-term)

- Add route-based navigation with `react-router-dom` for deep links and shareable URLs (e.g., `/shop`, `/product/:id`, `/cart`).
- Replace localStorage user store with a proper backend-auth service and hashed password storage.
- Add unit tests for key hooks and contexts (`CartContext`, `AuthContext`).
- Extract M-Pesa integration into a service module with proper retry and logging.
- Add form validation with a library like Zod or Yup for predictable and typed validation.

---

## Suggested improvements (long-term / product)

- Real product catalog persisted in a DB (Postgres, MongoDB, Supabase).
- Admin interface to manage breeds, stock, and orders.
- Order history and order status tracking (webhooks handling and UI for order states).
- Payment reconciliation and receipts via email (integration with an SMTP service or transactional email provider).

---

## Interview talking points — what to highlight

- Clear separation of concerns: UI components vs. contexts vs. backend API.
- Practical choice for quick demo: local auth + local cart context speeds up demo time with realistic UX.
- Real-world payment integration: implemented M-Pesa STK Push flow and callback handling showing knowledge of third-party integrations and webhooks.
- Attention to UX details: form validation in checkout, phone normalization, responsive header, search and smooth scrolling to categories.
- Testing and production hardening ideas: environment variables, secure storage of secrets, route-based navigation, and adding E2E tests to cover checkout flow.

---

## Files of interest (quick reference)

- Front-end
  - `src/App.tsx` — app entry and section navigation
  - `src/components/Header.tsx` — header, search, cart, checkout form
  - `src/components/Hero.tsx` — hero CTA
  - `src/components/CategorySection.tsx` — shop UI and product modal
  - `src/context/CartContext.tsx` — cart state and helpers
  - `src/context/AuthContext.tsx` — demo auth provider

- Backend
  - `Backend/app.js` — Express server and Daraja helper
  - `Backend/api.js` — Daraja endpoints and callback logic
  - `Backend/stkcallback.json` — (generated) callback store when Daraja calls back

---

## How I validated changes during development

- Ran `npm run build` in the `Front-end` folder to verify bundling and type checks (Vite and TypeScript). Build completed successfully in this environment.
- Verified `Hero.tsx` change: updated Shop CTA to call `navigateToSection('shop')` to align with the app's section-based navigation.

---

## Final notes / Next steps you can do before the presentation

- If you want live STK push in the demo, set up a Daraja sandbox account, configure ngrok to expose the `Backend` server, and replace callback URLs and credentials in `app.js`/`api.js`.
- Consider recording a short screencast of the shopping + checkout flow (30–60s) to play during the interview in case live payment demo is flaky.
- If you want, I can:
  - Convert this markdown into a slide deck (Reveal.js or Google Slides export), or
  - Add `react-router-dom` and migrate to real URLs for `shop` and `cart`.

---

Thank you — tell me which format you prefer for presenting (PDF, slides, or keep as markdown), and I can convert this into slides or a printable handout and/or add speaker notes and exact demo commands.
