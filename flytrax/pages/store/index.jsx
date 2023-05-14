import React from "react";
import { ProductCard, Banner } from "../../components";

const Store = () => {
  return (
    <div className="flex flex-col justify-center items-center align-middle m-auto w-11/12 max-sm:w-10/12 my-24 select-none">
      <div className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
        Tienda
      </div>
      <ProductCard />
    </div>
  );
};

export default Store;
