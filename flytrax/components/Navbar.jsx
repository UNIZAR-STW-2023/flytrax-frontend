import React from "react";
import Link from "next/link";
import Logo from "../assets/images/logo_desktop_gray.png";
import LogoMobile from "../assets/images/logo_mobile.png";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="max-lg:shadow-md h-24 w-full fixed top-0 left-0 shadow-md bg-slate-200 bg-opacity-70 backdrop-blur-md navbar">
      <div className="flex justify-between relative top-0 my-6 mx-8 md:mx-16">
        <Link
          href="/"
          className="grid grid-cols-3 max-sm:grid-cols-5 justify-items-center"
        >
          <Image
            src={LogoMobile}
            className="w-24 md:w-16 self-center col-span-1"
            alt="Flytrax Logo"
          />
          <Image
            src={Logo}
            className="w-40 self-center justify-items-center col-span-2 max-sm:hidden"
            alt="Flytrax Logo"
          />
        </Link>
        <button className="lg:hidden col-span-1 text-orange-600">
          <FaBars size={40} />
        </button>
        <div className="grid grid-cols-5 max-lg:hidden">
          <div className="flex items-center col-span-4 gap-6 pr-3 uppercase">
            <Link
              className="text-gray-700 font-bold hover:text-orange-600 ease-in-out duration-150"
              href=""
            >
              Quiénes somos
            </Link>
            <Link
              className="text-gray-700 font-bold hover:text-orange-600 ease-in-out duration-150"
              href=""
            >
              Servicios
            </Link>
            <Link
              className="text-gray-700 font-bold hover:text-orange-600 ease-in-out duration-150"
              href=""
            >
              Contacto
            </Link>
          </div>
          <div className="flex border-l-2 col-span-1 border-l-zinc-800 pl-3 items-center gap-6 uppercase">
            <Link
              className="text-cyan-700 font-bold hover:text-orange-600 ease-in-out duration-150"
              href="/login"
            >
              Únete
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
