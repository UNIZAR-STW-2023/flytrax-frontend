import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import Image from 'next/image';
import getStripe from '../lib/getStripe';

const Carrito = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

    //Handler del pago con stripe
    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems), //le pasamos los productos del carrito
        });

        if(response.statusCode === 500) return; //salimos de la funcion
        
        const data = await response.json();

        toast.loading('Redireccionando a la pantalla de pago...');

        // a partir del promise de stripe
        stripe.redirectToCheckout({ sessionId: data.id });
    }

    return (
        <div className="mt-24 cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading text-black "
                    onClick={() => setShowCart(false)}
                > 
                    <AiOutlineLeft />
                    <span className="heading text-black">Tu carrito</span>
                    <span className="text-blue-700 ml-3">({totalQuantities} items)</span>
                </button>

                { /* si esta vacio ponemos que esta EMPTY */ }
                {cartItems.length < 1 && (
                    <div className="flex flex-col items-center text-black">
                        <AiOutlineShopping size={100} />
                        <h3 className='text-black text-xl mt-2 mb-4'>Tu carrito esta vacio</h3>
                        
                        <div>
                            <Link href="/store">
                                <button 
                                    className="bg-blue-700 hover:bg-blue-800 px-10 w-full lg:max-w-[350px] h-14 rounded-xl flex justify-center items-center text-white text-xl"
                                    onClick={() => setShowCart(false)} //se cierra el carrito
                                >
                                    Seguir comprando
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                { /* el carro tiene productos */ }
                <div className="product-container">
                    
                    { /* mapear los productos */ }
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            <Image 
                                src={item?.image[0]} 
                                className="cart-product-image rounded-xl" 
                                width={200}
                                height={200}
                            />
                            <div>
                                <div className="flex-col">
                                    <h5 className='text-black text-xl font-bold'>{item.name}</h5>
                                    <h4 className='text-black text-lg'>{item.price.toFixed(2)}€</h4>
                                </div>
                                <div>
                                    <div>
                                        <p className="quantity-desc text-black flex-row flex items-center mt-3">
                                            <span 
                                                className='mr-2 text-lg'
                                                onClick={() => toggleCartItemQuanitity(item._id, 'restar') }
                                            >
                                                <AiOutlineMinus />
                                            </span>
                                            <span 
                                                className='mx-2 text-lg'
                                                onClick=""
                                            >
                                                {item.quantity}                         
                                            </span>
                                            <span 
                                                className='mx-2 text-lg' 
                                                onClick={() => toggleCartItemQuanitity(item._id, 'sumar') }
                                            >
                                                <AiOutlinePlus />
                                            </span>

                                            <button
                                                className="remove-item text-red-700 text-2xl ml-3"
                                                onClick={() => onRemove(item)}
                                            >
                                                <TiDeleteOutline />
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className="total text-black">
                            <h3 className='text-xl'>Total del pedido:</h3>
                            <h3 className='text-2xl font-bold'>{totalPrice.toFixed(2)}€</h3>
                        </div>
                        <div className="mt-5">  
                            <button 
                                className="bg-blue-700 hover:bg-blue-800 w-full lg:max-w-[350px] h-14 rounded-xl flex justify-center items-center text-white text-xl"
                                onClick={handleCheckout}
                            >
                                Realizar pedido
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Carrito