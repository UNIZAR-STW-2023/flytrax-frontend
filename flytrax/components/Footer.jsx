import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import Logo from "../assets/images/logo_desktop_white.png";
import LogoMobile from "../assets/images/logo_mobile_white.png";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t-2 bg-zinc-900 text-zinc-400 mt-5 px-8 py-3 gap-3 justify-center items-start">
      <div className="col-span-1">
        <h2 className="my-2">
          <Link href="/" className="grid grid-cols-5 w-fit">
            <Image
              src={LogoMobile}
              className="col-span-1 w-8"
              alt="Flytrax Logo"
            />
            <Image
              src={Logo}
              className="ml-2 col-span-4 w-20"
              alt="Flytrax Logo"
            />
          </Link>
        </h2>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Acerca de
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Blog
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Prensa & Logos
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Términos & Privacidad
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Status
          </Link>
        </h3>
        <h3>© 2023 Flytrax</h3>
      </div>
      <div className="col-span-1">
        <h2 className="my-2 uppercase text-xl text-zinc-50">Producto</h2>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Dispositivos soportados
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Integraciones
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Marcador
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Objetivos
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Equipos
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Educación
          </Link>
        </h3>
      </div>
      <div className="col-span-1">
        <h2 className="my-2 uppercase text-xl text-zinc-50">Aprende</h2>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            API Docs
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            FAQ
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Precios
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Valores
          </Link>
        </h3>
        <h3>
          <Link href="" className="hover:underline hover:text-zinc-50">
            Resolución de problemas
          </Link>
        </h3>
      </div>
      <div className="col-span-1">
        <h2 className="my-2 uppercase text-xl text-zinc-50">Comunidad</h2>
        <h3>
          <Link
            className="grid grid-cols-5 w-fit hover:underline hover:text-zinc-50"
            href="https://github.com/UNIZAR-STW-2023"
            target="_blank"
          >
            <FaGithub size={20} className="col-span-1" />
            <h3 className="col-span-4 ml-2">GitHub</h3>
          </Link>
        </h3>
        <h3>
          <Link
            className="grid grid-cols-5 w-fit hover:underline hover:text-zinc-50"
            href="https://github.com/UNIZAR-STW-2023"
            target="_blank"
          >
            <FaTwitter size={20} className="col-span-1" />
            <h3 className="col-span-4 ml-2">Twitter</h3>
          </Link>
        </h3>
        <h3>
          <Link
            className="grid grid-cols-5 w-fit hover:underline hover:text-zinc-50"
            href="https://github.com/UNIZAR-STW-2023"
            target="_blank"
          >
            <FaReddit size={20} className="col-span-1" />
            <h3 className="col-span-4 ml-2">reddit</h3>
          </Link>
        </h3>
        <h3>
          <Link
            className="grid grid-cols-5 w-fit hover:underline hover:text-zinc-50"
            href="https://github.com/UNIZAR-STW-2023"
            target="_blank"
          >
            <FaFacebook size={20} className="col-span-1" />
            <h3 className="col-span-4 ml-2">Facebook</h3>
          </Link>
        </h3>
        <h3>
          <Link
            className="grid grid-cols-5 w-fit hover:underline hover:text-zinc-50"
            href="https://github.com/UNIZAR-STW-2023"
            target="_blank"
          >
            <FaLinkedin size={20} className="col-span-1" />
            <h3 className="col-span-4 ml-2">LinkedIn</h3>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
