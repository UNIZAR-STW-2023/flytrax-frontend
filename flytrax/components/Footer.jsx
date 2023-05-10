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
import links from "../assets/dummy/footerLinks.js";

const Footer = () => {
  return (
    <div
      data-test="footer"
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-zinc-900 text-zinc-400 px-8 py-3 gap-3 justify-center items-start"
    >
      <div className="col-span-1">
        <h2 data-test="logo-footer" className="my-2 grid grid-cols-5 w-fit">
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
        </h2>
        {links.slice(0, 5).map((link) => (
          <h3 key={link.name}>
            <Link
              href={link.url}
              target={link.target}
              className="hover:underline hover:text-zinc-50"
            >
              {link.name}
            </Link>
          </h3>
        ))}
        <h3>© 2023 Flytrax</h3>
      </div>
      <div className="col-span-1">
        <h2 className="my-2 uppercase text-xl text-zinc-50">Producto</h2>
        {links.slice(5, 11).map((link) => (
          <h3 key={link.name}>
            <Link
              href={link.url}
              target={link.target}
              className="hover:underline hover:text-zinc-50"
            >
              {link.name}
            </Link>
          </h3>
        ))}
      </div>
      <div className="col-span-1">
        <h2 className="my-2 uppercase text-xl text-zinc-50">Aprende</h2>
        {links.slice(11, 16).map((link) => (
          <h3 key={link.name}>
            <Link
              href={link.url}
              target={link.target}
              className="hover:underline hover:text-zinc-50"
            >
              {link.name}
            </Link>
          </h3>
        ))}
      </div>
      <div className="col-span-1">
        <h2 className="my-2 uppercase text-xl text-zinc-50">Comunidad</h2>
        {links.slice(16, 21).map((link) => (
          <h3 key={link.name}>
            <Link
              href={link.url}
              target={link.target}
              className="grid grid-cols-5 w-fit hover:underline hover:text-zinc-50"
            >
              {link.name === "GitHub" ? (
                <FaGithub size={20} className="col-span-1" />
              ) : link.name === "Twitter" ? (
                <FaTwitter size={20} className="col-span-1" />
              ) : link.name === "reddit" ? (
                <FaReddit size={20} className="col-span-1" />
              ) : link.name === "Facebook" ? (
                <FaFacebook size={20} className="col-span-1" />
              ) : link.name === "LinkedIn" ? (
                <FaLinkedin size={20} className="col-span-1" />
              ) : null}
              <h3 className="col-span-4 ml-2">{link.name}</h3>
            </Link>
          </h3>
        ))}
      </div>
    </div>
  );
};

export default Footer;
