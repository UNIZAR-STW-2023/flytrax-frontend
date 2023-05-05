import React from "react";
import Image from "next/image";
import BannerImage from "../assets/images/banner-image.jpg";
import { SearchSection } from "../components";

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
        <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6">
          <span className="text-violet-700">Encuentra</span> <span className="text-black">Tu Aeropuerto
          Favorito. </span>
        </h1>
        <p className="max-w-[480px] mb-8 text-black">
          Encuentra información sobre los aeropuertos más grandes y pequeños del mundo con facilidad. 
          Busca por nombre, país o código IATA. Te proporcionamos toda la información que necesitas 
          para que tu viaje sea todo un éxito. 
          ¡Estamos aquí para hacer que tu experiencia en el aeropuerto sea lo mejor sin estrés posible!
        </p>
      </div>

      <div className="hidden flex-1 lg:flex justify-end items-end mb-6">
        <Image
          src={BannerImage}
          className="rounded-lg shadow-xl"
          alt="Home page"
        />
      </div>
    </div>
  );
};

export default Banner;
