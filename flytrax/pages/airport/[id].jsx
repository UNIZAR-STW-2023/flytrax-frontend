import React from "react";
import { useRouter } from "next/router";

const AirportDetails = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1400px] m-auto w-full my-24">
      <h1>Mapa del Aeropuerto</h1>
      {/* <Map coordinates={coordinates} /> */}
    </div>
  );
};

export default AirportDetails;
