import React from "react";
import Link from "next/link";
import Logo from "../assets/images/logo_desktop_white.png";
import LogoMobile from "../assets/images/logo_mobile.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="max-lg:shadow-md w-full fixed top-0 left-0 shadow-lg navbar">
      <div className="flex justify-between relative top-0 my-3 mx-5 mb-4">
        <Link href="/" className="grid grid-cols-3 justify-items-center">
          <Image
            src={LogoMobile}
            className="w-16 self-center col-span-1"
            alt="Flytrax Logo"
          />
          <Image
            src={Logo}
            className="w-40 self-center justify-items-center col-span-2 max-sm:hidden"
            alt="Flytrax Logo"
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link className="hover:text-violet-900" href="/login">
            Iniciar sesión
          </Link>
          <Link
            className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition"
            href="/register"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
