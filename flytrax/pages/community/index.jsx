import React, { useState, useEffect, Fragment } from "react";
import { aeropuertos } from "../../assets/dummy/aeropuertos_iata";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { FaTrashAlt } from "react-icons/fa";
import CommunityCard from "../../components/foro/CommunityCard";


const CommunityHome = () => {

    const airportIata = aeropuertos.map((airport) => airport.iata_code);

    const [queryIata, setQueryIata] = useState("");
    const [selectedIata, setSelectedIata] = useState("");
    const [airports, setAirports] = useState(aeropuertos);

    const longTotal = aeropuertos.length;


    const deleteSearch = () => {
        setQueryIata("");
        setAirports(aeropuertos);
    };



    /* Cada vez que cambie el valor de selected entonces se filtra */
    useEffect(() => {
        
        console.log("Selected Iata: " + selectedIata)

        if (selectedIata !== "") {
            const filtrado = aeropuertos.filter((item) => item.iata_code === selectedIata);
            console.log("Filtrado: " + filtrado)
            if(airports.length == longTotal){
                setAirports(filtrado);
            } else {
                setAirports(airports.concat(filtrado));
            }
            setSelectedIata("");
        } 
    

    }, [selectedIata])

    function getMatchesIata(query, vector) {
        const matches = [];
        let count = 0;
    
        if (query === "") {
          return [];
        } else {
          for (let i = 0; i < vector.length && count < 3; i++) {
          
            query = query.toUpperCase();
            
            if (query.length == 3){
              let vector_aux = vector[i];
              if (vector_aux === query) {
                matches.push(vector[i]);
                count++;
              }
            } else {
              let vector_aux = vector[i];
              for (let j = 0; j < query.length; j++) {
                if (vector_aux[j] == query[j]) {
                  matches.push(vector[i]);
                  count++;
                }
              }
            }
          }
        }
        return matches;
    }

    const filteredAirportIata = getMatchesIata(queryIata, airportIata)


    return (
        <div className="max-w-[1400px] m-auto w-full my-24">

            <div className="flex flex-col justify-center items-center align-middle m-auto w-10/12 mt-24 -mb-6 select-none">
                <h1 className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
                    Listado de foros 
                </h1>
            </div>


            {/* Airport by IATA Searcher */}
            <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex  lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4  rounded-lg ">
  
                <div className="w-full ">
                    <h1 className="font-light text-sm">Search by IATA </h1>
                    <Combobox value={selectedIata} onChange={setSelectedIata}>
                        <div className="relative">
                            <div className=" w-full cursor-default rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="flex h-[64px] items-center px-[18px] border rounded-lg w-full text-left focus:ring-0 leading-5 text-black"
                                displayValue={(airport) => airport}
                                onChange={(event) => setQueryIata(event.target.value)}
                            />
                            
                            </div>
                            <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQueryIata("")}
                            >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
                                {filteredAirportIata.length === 0 && queryIata !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                                ) : (
                                filteredAirportIata.map((airport) => (
                                    <Combobox.Option
                                    key={airport}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? "bg-teal-600 text-white" : "text-gray-900"
                                        }`
                                    }
                                    value={airport}
                                    >
                                    {({ active, selected }) => (
                                        <>
                                        <span
                                            className={`block truncate ${
                                            selected ? "font-medium" : "font-normal"
                                            }`}
                                        >
                                            {airport}
                                        </span>
                                        {selected ? (
                                            <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active ? "text-white" : "text-teal-600"
                                            }`}
                                            >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                        </>
                                    )}
                                    </Combobox.Option>
                                ))
                                )}
                                
                            </Combobox.Options>
                            </Transition>
                            
                        </div>
                    </Combobox>
                </div>

                {/* Deletee Search Button */}
                <button 
                    className="bg-red-700 hover:bg-red-800 transition w-full lg:max-w-[75px] sm:max-w-[75px] xs:max-w-[75px] h-16 rounded-lg flex justify-center items-center text-white text-lg mt-5"
                    onClick={() => deleteSearch()}
                >
                    <FaTrashAlt />
                </button>
            </div>


            {/* Airport Cards */}      
            <CommunityCard aeropuertos={airports} />
        
        </div>
            
    )
}

export default CommunityHome