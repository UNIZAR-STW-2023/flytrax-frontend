/*
  File's name: Loader.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = ({ value }) => {
  return (
    <div className="loader-style w-full rounded-md select-none pt-24">
      <div className="max-sm:text-3xl text-4xl font-bold">
        <h1 className="mx-5 flex align-middle items-center justify-center text-center">
          Cargando {value}...
        </h1>
        <div className="flex relative pt-3 top-0 left-0 h-full w-full align-middle justify-center">
          <p>
            <CircularProgress color="inherit" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
