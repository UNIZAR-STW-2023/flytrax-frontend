import React from "react";
import Link from "next/link";
import Logo from "../assets/images/logo_desktop_gray.png";
import LogoMobile from "../assets/images/logo_mobile.png";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import MenuList from "./MenuList";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="max-lg:shadow-md h-24 w-full fixed top-0 left-0 shadow-md bg-slate-200 bg-opacity-70 backdrop-blur-md navbar">
      <div className="flex justify-between relative top-0 my-6 mx-8 md:mx-16">
        <div className="grid grid-cols-6 max-lg:w-full">
          <Link
            href="/"
            className="grid grid-cols-3 max-lg:grid-cols-5 col-span-5 justify-items-center"
          >
            <Image
              src={LogoMobile}
              className="w-20 self-center col-span-1 lg:mr-2"
              alt="Flytrax Logo"
            />
            <Image
              src={Logo}
              className="w-40 self-center justify-items-center col-span-2 max-lg:col-span-1 max-sm:hidden"
              alt="Flytrax Logo"
            />
          </Link>
          <button
            data-test="menu-button"
            className="lg:hidden col-span-1 text-orange-600"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={open ? faClose : faBars} size="3x" />
          </button>
        </div>
        <div className="grid grid-cols-5 max-lg:hidden">
          <div className="flex items-center col-span-4 gap-6 pr-3 uppercase">
            <Link
              className="text-gray-700 light-font hover:text-orange-600 ease-in-out duration-150"
              href=""
            >
              Quiénes somos
            </Link>
            <Link
              className="text-gray-700 light-font hover:text-orange-600 ease-in-out duration-150"
              href=""
            >
              Servicios
            </Link>
            <Link
              className="text-gray-700 light-font hover:text-orange-600 ease-in-out duration-150"
              href=""
            >
              Contacto
            </Link>
          </div>
          <div
            data-test="join-web-button"
            className="flex border-l-2 col-span-1 border-l-zinc-800 pl-3 items-center gap-6 uppercase"
          >
            <Link
              className="text-gray-700 text-xl font-bold hover:text-orange-600 ease-in-out duration-150"
              href="/login"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <MenuList open={open} />
      </div>
    </nav>
  );
};

export default Navbar;
