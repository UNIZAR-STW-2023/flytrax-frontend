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
    <div>
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
    </div>
  );
};

export default Success;
