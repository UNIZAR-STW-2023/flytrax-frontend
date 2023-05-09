import React from "react";
import { CircularProgress } from "@mui/material";
//import "../css/catalog.css";

const Loader = () => {
  return (
    <div className="loader-style w-full rounded-md select-none pt-24">
      <h1 className="text-4xl font-bold">
        Cargando...
        <div className="flex relative pt-3 top-0 left-0 h-full w-full align-middle justify-center">
          <p>
            <CircularProgress color="inherit" />
          </p>
        </div>
      </h1>
    </div>
  );
};

export default Loader;
