import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PanelesCard } from '../../components';
import ClipLoader from "react-spinners/ClipLoader";
import { aeropuertos } from "../../assets/dummy/aeropuertos_iata";

const AirportDetails = () => {
  const router = useRouter()
  const { slug } = router.query

  const [airports, setAirports] = useState([]);
  const [actualAirport, setActualAirport] = useState("");
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {

    if (!router.isReady) return;
    aeropuertos.map(function (item) {
        if (item.iata_code === slug.toUpperCase()) {
            setActualAirport(item.iata_code);
            setIsLoading(false);
        }
    })

    const getArrivals = async () => {
        
    }

    setIsLoading(false);
}, [router.query.slug, router.isReady]);

  return (

    actualAirport.length != 0 ? (
      <div className="max-w-[1400px] m-auto w-full my-24">
        <h1>Mapa del Aeropuerto</h1>
        <h1>Panel del Aeropuerto</h1>
        {/* <Map coordinates={coordinates} /> */}
        <h1 className="text-xl text-center mb-4 font-semibold text-black">Aeropuerto {slug.toUpperCase()}</h1>
        <h3 className="text-xl text-center mb-4 font-semibold text-black">Salidas</h3>
        <PanelesCard />
      </div>
    ) : (
      <div className="max-w-[1400px] m-auto w-full my-24 py-20">
          <div className='flex items-center justify-center'>
              {
                  !loading ? (
                      <div>El aeropuerto con IATA: {slug.toUpperCase()} no existe</div>
                  ) : (
                      <ClipLoader
                          loading={loading}
                          size={100}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                      />
                  )
              }
          </div>
      </div>
    )
  );
};

export default AirportDetails;
