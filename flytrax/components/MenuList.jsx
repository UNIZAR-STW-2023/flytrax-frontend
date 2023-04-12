import React from "react";
import Link from "next/link";

const MenuList = ({ open }) => {
  return (
    <ul
      className={`py-4 md:py-6 md:text-lg lg:items-center text-center pb-auto absolute backdrop-blur-3xl shadow-inherit bg-slate-100/80 z-[-1] w-full transition-all duration-500 ease-in-out ${
        open ? "top-24 opacity-100" : "opacity-0 hidden"
      }`}
    >
      <li>
        <Link
          className="text-gray-700 light-font hover:text-orange-600 ease-in-out duration-150 uppercase"
          href=""
        >
          Quiénes somos
        </Link>
      </li>
      <li className="my-3 py-3 border-t-orange-600 border-b-orange-600 border-t-2 border-b-2 border-dashed">
        <Link
          className="text-gray-700 light-font hover:text-orange-600 ease-in-out duration-150 uppercase"
          href=""
        >
          Servicios
        </Link>
      </li>
      <li>
        <Link
          className="text-gray-700 light-font hover:text-orange-600 ease-in-out duration-150 uppercase"
          href=""
        >
          Contacto
        </Link>
      </li>
      <li
        data-test="li-join-button"
        className="my-3 pt-6 border-t-orange-600 border-t-2 border-dashed"
      >
        <Link
          className="text-gray-700 font-extrabold text-xl hover:text-orange-600 ease-in-out duration-150 uppercase"
          href="/login"
        >
          Entrar
        </Link>
      </li>
    </ul>
  );
};

export default MenuList;
