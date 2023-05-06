import Stripe from 'stripe';

//Stripe nos proporciona el metodo de pago
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if(req.method === 'POST'){
        console.log(req.body); 
        
        try {
            //Procesar pago. Sacado de la documentacion de stripe
            const params = {

                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                  { shipping_rate: 'shr_1N40XdAxcgsUGFwsNQfSchUA' }, //envio gratis
                  { shipping_rate: 'shr_1N40YRAxcgsUGFwsSXHrBT2H' } //envio express
                ],

                line_items: req.body.map((item) => {

                  let img;

                  if(item.name === 'Camiseta Flytrax 1'){
                    img = "https://files.stripe.com/links/MDB8YWNjdF8xTjQwUFRBeGNnc1VHRndzfGZsX3Rlc3RfdTI3ekdIUXZROTQ3Z3cwSlBTWVNQbEpZ00DR3GhfJg"
                  } else if(item.name === 'Camiseta Flytrax 2'){
                    img = "https://files.stripe.com/links/MDB8YWNjdF8xTjQwUFRBeGNnc1VHRndzfGZsX3Rlc3RfTTVBTmFKblRidmhPdmg2VjNaZ3ZJUHoy003NaGKhte"
                  } else if(item.name === 'Camiseta Flytrax 3'){
                    img = "https://files.stripe.com/links/MDB8YWNjdF8xTjQwUFRBeGNnc1VHRndzfGZsX3Rlc3RfS01IeGVHRG0zNzhzOWxHM2NzbmpvSVZp00WIbfzwDy"
                  } else if(item.name === 'Camiseta Flytrax 4'){
                    img = "https://files.stripe.com/links/MDB8YWNjdF8xTjQwUFRBeGNnc1VHRndzfGZsX3Rlc3RfdGNXWDZUTE90bmxabGZ5OEZWak1BemR000ATjKkpZU"
                  } else if(item.name === 'Camiseta Flytrax 5'){
                    img = "https://files.stripe.com/links/MDB8YWNjdF8xTjQwUFRBeGNnc1VHRndzfGZsX3Rlc3Rfd3V0aVJsT091a1d0dVNMODlPU0JBQU53008bbO0pLo"
                  }
                  
                  {console.log("El precio es: ", (item.price * 100).toFixed(0))}
                  return {
                    price_data: { 
                      currency: 'eur',
                      product_data: { 
                        name: item.name,
                        images: [img],
                      },
                      unit_amount: (item.price * 100).toFixed(0),
                    },
                    adjustable_quantity: {
                      enabled:true,
                      minimum: 1,
                    },
                    quantity: item.quantity
                  }
                }),
                success_url: `${req.headers.origin}/store/success`, //redirecciona a la pagina de confetti 
                cancel_url: `${req.headers.origin}/canceled`,
              }
        
              // Create Checkout Sessions from body params.
              const session = await stripe.checkout.sessions.create(params);
        
              res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ statusCode: 500, message: error.message })
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}