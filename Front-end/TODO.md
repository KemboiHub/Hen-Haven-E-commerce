# TODO: Fix M-Pesa Payment Form in Header.tsx

## Steps to Complete
- [x] Fix syntax error in handleCheckout function by removing erroneous const redefinition and placing fetch directly in try block.
- [x] Add state for showPaymentForm modal.
- [x] Modify handleCheckout to set showPaymentForm(true) after validation, normalizing phone and preparing total.
- [x] Update PaymentForm component to accept props: initialPhone, initialAmount, onSuccess, onClose.
- [x] Pre-fill PaymentForm with initialPhone and initialAmount.
- [x] Set accountNumber to 'HenHavenOrder' in PaymentForm submit.
- [x] On successful payment, call onSuccess to clear cart and show success message, then onClose.
- [x] Render PaymentForm in a modal when showPaymentForm is true, with close button.
- [x] Test the checkout flow to ensure STK push is sent to the correct phone.
