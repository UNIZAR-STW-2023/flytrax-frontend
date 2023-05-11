import React, { useState, useEffect, Fragment } from "react";
import { Banner, AirportCard } from "../../components";
import { FaTrashAlt } from "react-icons/fa";
import { useStateContext } from "../../context/StateContext";
import { aeropuertos } from "../../assets/dummy/aeropuertos_iata";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const FavAirports = () => {

  const [airports, setAirports] = useState(aeropuertos);
  
  return (
    <div className="max-w-[1400px] m-auto w-full my-24">

        
        <p className="max-w-[480px] opacity-0">
          Encuentra información sobre los aeropuertos más grandes y pequeños del mundo con facilidad. 
          Busca por nombre, país o código IATA. Te proporcionamos toda la información que necesitas 
        </p>

         <h1 className="text-4xl text-center font-semibold mb-16">
          <span className="text-black">Tus Aeropuertos</span> <span className="text-red-700">
          Favoritos </span>
        </h1>
            
        {/* Airport Cards */}      
        <AirportCard aeropuertos={airports} />
    </div>
  );
};

export default FavAirports;
