/*
  File's name: Carrito.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import Image from "next/image";
import getStripe from "../lib/getStripe";
import { AppBar } from "@mui/material";

const Carrito = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  //Handler del pago con stripe
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems), //le pasamos los productos del carrito
    });

    if (response.statusCode === 500) return; //salimos de la funcion

    const data = await response.json();

    toast.loading("Redireccionando a la pantalla de pago...", {
      position: "bottom-center",
    });

    // a partir del promise de stripe
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="pt-24 h-full" ref={cartRef}>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          height: "12%",
          background: "linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)",
        }}
        position="sticky"
      >
        <div className="flex flex-row gap-3 px-5 items-center justify-start uppercase text-white p-3">
          <span className="font-light">Tu carrito</span>
          <span className="font-semibold text-orange-400">
            ({totalQuantities} items)
          </span>
        </div>
      </AppBar>
      <div className="flex flex-col h-[88%] align-middle justify-center items-center text-black">
        {cartItems.length < 1 ? (
          <div className="flex flex-col align-middle justify-center items-center text-black">
            <AiOutlineShopping size={100} />
            <h3 className="text-black text-xl mt-2 mb-4">
              Tu carrito esta vacío
            </h3>
          </div>
        ) : (
          <div className="mt-5 h-full overflow-auto flex flex-col justify-between">
            {cartItems.map((item) => (
              <div className="flex h-64 p-5 gap-5" key={item._id}>
                <Image
                  alt="Product Image"
                  src={item?.image[0]}
                  className="cart-product-image rounded-md"
                  width={200}
                  height={200}
                />
                <div className="flex flex-col align-middle items-start justify-between">
                  <div className="flex-col">
                    <h5 className="text-black uppercase text-justify w-full text-lg font-semibold">
                      {item.name}
                    </h5>
                    <h4 className="text-black text-lg">
                      {item.price.toFixed(2)} EUR
                    </h4>
                    <h4 className="text-black text-lg">{item.size}</h4>
                  </div>

                  <div className="w-full md:flex flex-row justify-between align-middle items-center">
                    <p className="text-black flex flex-row align-middle items-center justify-start">
                      <span
                        className="mr-2 text-lg cursor-pointer hover:text-orange-600 transition ease-in duration-200"
                        onClick={() =>
                          toggleCartItemQuanitity(item._id, "restar")
                        }
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="mx-2 text-lg" onClick="">
                        {item.quantity}
                      </span>
                      <span
                        className="ml-2 text-lg cursor-pointer hover:text-orange-600 transition ease-in duration-200"
                        onClick={() =>
                          toggleCartItemQuanitity(item._id, "sumar")
                        }
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                    <button
                      className="uppercase hover:text-gray-500 transition ease-in duration-200 font-medium text-md flex align-middle items-center text-red-700"
                      onClick={() => onRemove(item)}
                    >
                      Eliminar <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* el carro tiene productos */}

        {cartItems.length >= 1 && (
          <div className="w-full flex flex-col">
            <div className="flex flex-row align-middle items-center justify-start px-5 gap-2 text-black">
              <h3 className="text-xl uppercase">Pedido total:</h3>
              <h3 className="text-2xl font-bold">
                {totalPrice.toFixed(2)} EUR
              </h3>
            </div>
            <div className="m-5">
              <button
                className="uppercase bg-blue-700 hover:bg-blue-900 transition ease-in-out duration-200 w-full h-14 rounded-full flex justify-center items-center text-white text-xl"
                onClick={handleCheckout}
              >
                Realizar pedido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
