import React from "react";
import { CircularProgress } from "@mui/material";
//import "../css/catalog.css";

function Loading() {
  return (
    <div className="App-header select-none pt-24">
      <h1 className="text-4xl text-orange-600">
        Cargando...
        <div className="flex relative pt-3 top-0 left-0 h-full w-full align-middle justify-center">
          <p>
            <CircularProgress color="warning" />
          </p>
        </div>
      </h1>
    </div>
  );
}

export default Loading;
