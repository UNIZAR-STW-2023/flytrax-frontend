import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../../context/StateContext";
import { runFireworks } from "../../lib/utils"; //canvas confetti que hemos creado en utils

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    //localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <div>
      <div className="p-32 min-h-[69vh] flex flex-col justify-center items-center">
        <p className="mt-3">
          <BsBagCheckFill size={40} />
        </p>
        <h2 className="text-2xl font-bold mt-4">Gracias por tu pedido!</h2>
        <p className="text-xl mt-2">Comprueba tu email para el recibo.</p>
        <p className="text-xl mb-4">
          Si tienes cualquier duda envíanos un correo
          <a
            className="text-blue-700 font-bold ml-2"
            href="mailto:order@example.com"
          >
            flytrax.info@gmail.com
          </a>
        </p>
        <div>
          <Link href="/store">
            <button className="bg-blue-700 hover:bg-blue-800 px-10 w-full lg:max-w-[350px] h-14 rounded-xl flex justify-center items-center text-white text-xl">
              Seguir comprando
            </button>
          </Link>
        </div>
      </div>
    </div> */}
      <div className="App-header justify-center select-none pt-24">
        <div className="flex flex-col align-middle items-center gap-3 justify-center py-2 my-3 w-80 md:w-1/3 max-sm:mx-2">
          <p className="mt-3">
            <BsBagCheckFill size={40} />
          </p>
          <h1 className="text-center text-4xl font-bold text-slate-900">
            <span className="text-green-700">¡Pedido realizado!</span>
            <p className="text-3xl">
              Revisa tu bandeja del correo electrónico para comprobar que ha
              llegado el recibo.
            </p>
          </h1>
          <h2 className="text-center text-gray-600 font-regular text-xl">
            Si tienes cualquier duda envíanos un correo a{" "}
            <a
              className="text-indigo-700 hover:text-orange-700 transition ease-in duration-200 font-bold"
              href="mailto:order@example.com"
            >
              flytrax.info@gmail.com
            </a>{" "}
            y te contestaremos lo antes posible.
          </h2>
        </div>
        <div
          className="flex flex-col items-center align-center w-4/5 my-8"
          data-test="join-button"
        >
          <Link
            className="p-5 rounded-lg hover:backdrop-blur-md drop-shadow-md uppercase font-semibold text-xl bg-transparent text-pink-800 hover:text-slate-50 hover:bg-slate-400 hover:bg-opacity-40 transition ease-out duration-300 max-sm:text-sm"
            href="/store"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
