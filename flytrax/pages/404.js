/*
  File's name: /404.js
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="App-header h-fit">
      <div className="flex flex-col items-center align-center w-4/5 max-sm:mt-28">
        <h1 className="h-fit error-text error-text-resize max-sm:text-9xl font-bold text-gray-500">
          404
        </h1>
        <h1 className="font-bold text-gray-900 text-5xl max-sm:text-3xl text-center justify-center">
          ¡Vaya, has encontrado un lugar secreto!
        </h1>
        <h2 className="w-2/3 max-sm:w-full font-semibold text-2xl max-sm:text-lg text-gray-600 mt-5 text-center justify-center">
          Desafortunadamente, esto es solo una página 404. Es posible que hayas
          escrito mal la dirección o que la página se haya movido a otra URL.
        </h2>
      </div>
      <div
        className="flex flex-col items-center align-center w-4/5 my-8"
        data-test="join-button"
      >
        <Link
          className="p-5 rounded-lg hover:backdrop-blur-md drop-shadow-md uppercase font-semibold text-xl bg-transparent text-pink-800 hover:text-slate-50 hover:bg-slate-400 hover:bg-opacity-40 transition ease-out duration-300 max-sm:text-sm"
          href="/"
        >
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
