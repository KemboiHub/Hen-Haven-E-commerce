# TODO: Implement Login Button and Authentication Prompt

## Steps to Complete

- [x] Create AuthContext (src/context/AuthContext.tsx) to manage user authentication state (login status, user data).
- [x] Create LoginModal component (src/components/LoginModal.tsx) with creative design: animated modal with login/signup tabs, form validation, and simulated authentication.
- [ ] Update Header.tsx: Make the User icon clickable to open the LoginModal; display user info if logged in.
- [ ] Update Header.tsx: Modify the cart checkout button to check if user is logged in; if not, open the LoginModal instead of proceeding to checkout.
- [ ] Test the login flow and cart checkout prompt.
- [ ] If needed, integrate with a real backend for persistent auth.

## TODO: Modify Cart Total Feature

## Steps to Complete

- [ ] Update CartContext.tsx: Add 'total' to CartContextType interface and compute it as the sum of (parseInt(price.replace('Ksh ', '')) * quantity) for all cart items.
- [ ] Update Header.tsx: Replace inline total calculation with context.total.
- [ ] Test the cart total display in the header dropdown.
