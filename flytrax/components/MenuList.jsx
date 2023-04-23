import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import CustomLink from "./CustomLink";

const MenuList = ({ open }) => {
  const router = useRouter();

  const [user, setUser] = useState(false);

  const SESSION_COOKIE = getCookie("sessionToken");

  useEffect(() => {
    // Fetch user cookie value
    const sessionCookie = getCookie("sessionToken");
    // Update state with user cookie value
    setUser(sessionCookie);
  }, []);

  const handleLogout = () => {
    // Eliminar cookie de sesión
    deleteCookie("sessionToken");
    // Actualizar estado de usuario
    setUser(false);
    // Redireccionar a la página principal
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return SESSION_COOKIE ? (
    <ul
      className={`py-4 md:py-6 md:text-lg lg:items-center text-center pb-auto absolute backdrop-blur-3xl shadow-inherit bg-slate-100/80 z-[-1] w-full transition-all duration-500 ease-in-out ${
        open ? "top-24 opacity-100" : "opacity-0 hidden"
      }`}
    >
      <li>
        <CustomLink
          className="hover:text-orange-600 ease-in-out duration-150 uppercase"
          to={"/map"}
        >
          Mapa
        </CustomLink>
      </li>
      <li className="my-3 py-3 border-t-orange-600 border-b-orange-600 border-t-2 border-b-2 border-dashed">
        <CustomLink
          className="hover:text-orange-600 ease-in-out duration-150 uppercase"
          to={""}
        >
          Favoritos
        </CustomLink>
      </li>
      <li>
        <CustomLink
          className="hover:text-orange-600 ease-in-out duration-150 uppercase"
          to={""}
        >
          Perfil
        </CustomLink>
      </li>
      <li
        data-test="li-join-button"
        className="my-3 pt-6 border-t-orange-600 border-t-2 border-dashed"
      >
        <button
          className="text-gray-700 font-bold text-xl hover:text-orange-600 ease-in-out duration-150 uppercase"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </li>
    </ul>
  ) : (
    <ul
      className={`py-4 md:py-6 md:text-lg lg:items-center text-center pb-auto absolute backdrop-blur-3xl shadow-inherit bg-slate-100/80 z-[-1] w-full transition-all duration-500 ease-in-out ${
        open ? "top-24 opacity-100" : "opacity-0 hidden"
      }`}
    >
      <li>
        <CustomLink
          className="hover:text-orange-600 ease-in-out duration-150 uppercase"
          to={""}
        >
          Quiénes somos
        </CustomLink>
      </li>
      <li className="my-3 py-3 border-t-orange-600 border-b-orange-600 border-t-2 border-b-2 border-dashed">
        <CustomLink
          className="hover:text-orange-600 ease-in-out duration-150 uppercase"
          to={"/faq"}
        >
          FAQ
        </CustomLink>
      </li>
      <li>
        <CustomLink
          className="hover:text-orange-600 ease-in-out duration-150 uppercase"
          to={""}
        >
          Contacto
        </CustomLink>
      </li>
      <li
        data-test="li-join-button"
        className="my-3 pt-6 border-t-orange-600 border-t-2 border-dashed"
      >
        <CustomLink
          className="font-bold text-xl hover:text-orange-600 ease-in-out duration-150 uppercase"
          to={"/login"}
        >
          Entrar
        </CustomLink>
      </li>
    </ul>
  );
};

export default MenuList;
