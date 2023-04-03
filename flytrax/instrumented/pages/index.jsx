import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="App-header max-sm:pt-24 pt-24">
      <div className="md:px-12 flex flex-col justify-center items-center fade-in">
        <div className="col-span-1 font-bold text-center py-2 home-text text-5xl md:text-6xl">
          Viaja con tranquilidad<span className="text-zinc-800">,</span>
        </div>
        <div className="font-bold text-center text-zinc-800 text-5xl md:text-6xl">
          deja que nosotros sigamos el camino por ti.
        </div>
        <div data-test="join-button">
          <Link
            className="my-10 backdrop-blur-sm drop-shadow-md gradient-btn text-gray-700 border-gray-700 max-sm:text-sm"
            href="/login"
          >
            Únete ahora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
