import React, { useState, useEffect, Fragment } from "react";
import { Banner, AirportCard } from "../../components";
import { FaTrashAlt } from "react-icons/fa";
import { useStateContext } from "../../context/StateContext";
import { aeropuertos } from "../../assets/dummy/aeropuertos_iata";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const AirportsList = () => {

  const [selectedName, setSelectedName] = useState("");
  const [selectedIata, setSelectedIata] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const longTotal = aeropuertos.length;

  const [queryName, setQueryName] = useState("");
  const [queryIata, setQueryIata] = useState("");
  const [queryCountry, setQueryCountry] = useState("");
  const [airports, setAirports] = useState(aeropuertos);

  const airportName = aeropuertos.map((airport) => airport.name);

  const countryCodes = aeropuertos.map((airport) => airport.country_code);
  const airportCountry = countryCodes.filter((code, index, array) => array.indexOf(code) === index);
  
  const airportIata = aeropuertos.map((airport) => airport.iata_code);

  const deleteSearch = () => {
    setQueryName("");
    setQueryIata("");
    setQueryCountry("");
    setAirports(aeropuertos);
  };


  /* Cada vez quee cambie el valor de selected entonces se filtra */
  useEffect(() => {
    console.log("Selected Name: " + selectedName)
    console.log("Selected Iata: " + selectedIata)
    console.log("Selected Country: " + selectedCountry)

    if (selectedName !== "") {
      const filtrado = aeropuertos.filter((item) => item.name === selectedName);
      console.log("Filtrado: " + filtrado)

      if(airports.length == longTotal){
        setAirports(filtrado);
      } else {
        setAirports(airports.concat(filtrado));
      }
      setSelectedName("")
    }
    else if (selectedIata !== "") {
      const filtrado = aeropuertos.filter((item) => item.iata_code === selectedIata);
      console.log("Filtrado: " + filtrado)
      if(airports.length == longTotal){
        setAirports(filtrado);
      } else {
        setAirports(airports.concat(filtrado));
      }
      setSelectedIata("");
    } 
    else if (selectedCountry !== "") {
      const filtrado = aeropuertos.filter((item) => item.country_code === selectedCountry);
      if(airports.length == longTotal){
        setAirports(filtrado);
      } else {
        setAirports(airports.concat(filtrado));
      }
      setSelectedCountry("");
    } 

  }, [selectedName, selectedIata, selectedCountry])


  function getMatches(query, vector) {
    const matches = [];
    let count = 0;

    if (query === "") {
      return [];
    } else {
      for (let i = 0; i < vector.length && count < 3; i++) {
        if (vector[i].toLowerCase().includes(query.toLowerCase())) {
          matches.push(vector[i]);
          count++;
        }
      }
    }
    return matches;
  }

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

  const filteredAirportName = getMatches(queryName, airportName)
  const filteredAirportIata = getMatchesIata(queryIata, airportIata)
  const filteredAirportCountry = getMatches(queryCountry, airportCountry)

  return (
    <div className="max-w-[1400px] m-auto w-full my-24">

      {/* Banner */}
      <section className="h-full max-h-[640px] mt-20 xl:mb-16">
        
        <Banner />
        {/* Search Section */}
        <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-lg bg-white lg:bg-transparent rounded-lg">
  
          {/* Airport by Country Searcher */}
          <div className="w-full cursor-pointer relative">
            <h1 className="font-light text-sm">Search by Country Code </h1>
            <Combobox value={selectedCountry} onChange={setSelectedCountry}>
              <div className="relative">
                <div className=" w-full cursor-default rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="flex h-[64px] items-center px-[18px] border rounded-lg w-full text-left focus:ring-0 leading-5 text-black"
                    displayValue={(airport) => airport}
                    onChange={(event) => setQueryCountry(event.target.value)}
                  />
                
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQueryCountry("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredAirportCountry.length === 0 && queryCountry !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredAirportCountry.map((airport) => (
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

          {/* Airport by IATA Searcher */}
          <div className="w-full cursor-pointer relative">
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
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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

          {/* Airport by Name Searcher */}
          <div className="w-full cursor-pointer relative">
            <h1 className="font-light text-sm">Search by Name </h1>
            <Combobox value={selectedName} onChange={setSelectedName}>
              <div className="relative">
                <div className=" w-full cursor-default rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="flex h-[64px] items-center px-[18px] border rounded-lg w-full text-left focus:ring-0 leading-5 text-black"
                    displayValue={(airport) => airport}
                    onChange={(event) => setQueryName(event.target.value)}
                  />
                
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQueryName("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredAirportName.length === 0 && queryName !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredAirportName.map((airport) => (
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

          {/* Search Button */}
          <button 
            className="bg-red-700 hover:bg-red-800 transition w-full lg:max-w-[75px] h-16 rounded-lg flex justify-center items-center text-white text-lg mt-5"
            onClick={() => deleteSearch()}
          >
            <FaTrashAlt />
          </button>
        </div>




      </section>

      {/* Airport Cards */}      
      <AirportCard aeropuertos={airports} />
    </div>
  );
};

export default AirportsList;
