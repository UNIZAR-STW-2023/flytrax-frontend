import React from "react";
import { useRouter } from "next/router";
import Map from "../../components/map/Map";

const AirportDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("airportId es: " + id);
  const coordinates = [51.505, -0.09];

  return (
    <div className="max-w-[1400px] m-auto w-full my-24">
      <h1>Mapa del Aeropuerto</h1>
      <Map coordinates={coordinates} />
    </div>
  );
};

export default AirportDetails;
