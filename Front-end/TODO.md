# TODO: Fix M-Pesa Payment Form in Header.tsx

## Steps to Complete
- [ ] Fix syntax error in handleCheckout function by removing erroneous const redefinition and placing fetch directly in try block.
- [ ] Add state for showPaymentForm modal.
- [ ] Modify handleCheckout to set showPaymentForm(true) after validation, normalizing phone and preparing total.
- [ ] Update PaymentForm component to accept props: initialPhone, initialAmount, onSuccess, onClose.
- [ ] Pre-fill PaymentForm with initialPhone and initialAmount.
- [ ] Set accountNumber to 'HenHavenOrder' in PaymentForm submit.
- [ ] On successful payment, call onSuccess to clear cart and show success message, then onClose.
- [ ] Render PaymentForm in a modal when showPaymentForm is true, with close button.
- [ ] Test the checkout flow to ensure STK push is sent to the correct phone.
