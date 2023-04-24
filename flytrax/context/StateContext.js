import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from 'react-hot-toast';

import { airportsData, countriesData } from "../assets/dummy/dummyDatos";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [airports, setAirports] = useState([
    "Airports (any)",
    ...new Set(airportsData),
  ]);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState();
  const [loading, setLoading] = useState(false);

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  useEffect(() => {
    const allCountries = airports.map((airport) => {
      return airport.country;
    });
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);

  /* CARRITO DE COMPRA */
  // Agregar al carrito
  const onAdd = (product, quantity) => {
    //mirar si esta ya en el carrito para sumar cantidad y no meterlo de nuevo
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(checkProductInCart){
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            }
        })
        setCartItems(updatedCartItems);

    } else {
        product.quantity = quantity;
        setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} añadido al carrito.`);
  }

  //Eliminar producto del carrito
  const onRemove = (product) => {
    console.log("El carrito tiene: " + cartItems)
    foundProduct = cartItems.find((item) => item._id === product._id);
    //el carrito actual menos el "product"
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  //Sumar o restar unidades de un producto
  const toggleCartItemQuanitity = (id, value) => {
    console.log("El carrito tiene: " + cartItems)
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)
    
    //quedarnos todos los items menos el que estamos actualizando "id"
    const newCartItems = cartItems;

    if(value === 'sumar'){
        newCartItems.map((item) => (item._id === id) && (item.quantity = foundProduct.quantity + 1));
        setCartItems([...newCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } 
    
    else if(value === 'restar'){
        if(foundProduct.quantity > 1){
            newCartItems.map((item) => (item._id === id) && (item.quantity = foundProduct.quantity - 1));
            setCartItems([...newCartItems]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
    }
  }

  const sumarCantidad = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const restarCantidad = () => {
      setQty((prevQty) => {
          if(prevQty - 1 < 1) return 1;

          return prevQty - 1;
      });
  }

  return (
    <Context.Provider
      value={{
        airports,
        setAirports,
        country,
        setCountry,
        countries,
        setCountries,
        selectedAirport,
        setSelectedAirport,
        loading,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        sumarCantidad,
        restarCantidad,
        onAdd,
        toggleCartItemQuanitity, 
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
