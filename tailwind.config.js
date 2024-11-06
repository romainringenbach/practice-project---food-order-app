/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    colors: {
      'text': '#d9e2f1',
      'card-background': '#1d1a16',
      'price': '#ffc404',
      'price-background': '#312c1d',
      'button': '#1f1a09',
      'button-background': '#ffc404',
      'button-active-background': '#ffab04',
      'button-disabled': '#46443c',
      'button-disabled-background': '#1d1a16',
      'logo-border': '#ffc404',
      'modal-background': '#e4ddd4',
      'cart-text': '#1d1a16',
      'cart-text-active': '#312c1d',
      'cart-actions-button-background': '#312c1d',
      'cart-actions-button': '#ffc404',
      'cart-actions-button-active-background': '#1d1a16',
      'cart-actions-button-active': '#ffab04',
      'cart-total': '#46443c',
      'checkout-input-border': '#ccc',
      'checkout-input-border-invalid': '#f43f5e'
    },
    fontFamily: {
      'header': ['Lato', 'ui-sans-serif']
    },
    extend: {
      'gridTemplateColumns': {
        'meals-layout': 'repeat(auto-fit, minmax(20rem, 1fr))'
      }
    },
  },
  plugins: [],
}