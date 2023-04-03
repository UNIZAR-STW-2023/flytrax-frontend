import React from "react";
import Image from "next/image";
import BannerImage from "../assets/images/banner-image.jpg";
import { SearchSection } from "../components";

const Banner = () => {
  return (
    <section className="h-full max-h-[640px] mt-20 xl:mb-16">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6">
            <span className="text-violet-700">Encuentra</span> <span className="text-black">Tu Aeropuerto
            Favorito. </span>
          </h1>
          <p className="max-w-[480px] mb-8 text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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

      <SearchSection />
    </section>
  );
};

export default Banner;
