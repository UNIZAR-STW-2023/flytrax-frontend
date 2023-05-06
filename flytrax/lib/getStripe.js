import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

//Para crear el promise de Stripe que necesitaremos en el momento que se le de al boton de pagar con stripe para que lleve a la pantalla de pago
const getStripe = () => {
    if(!stripePromise) { 
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
}

export default getStripe;