import React, { useState, useEffect, createContext, useContext } from "react";

import { airportsData, countriesData } from "../assets/dummy/dummyDatos";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [airports, setAirports] = useState([
    "Airports (any)",
    ...new Set(airportsData),
  ]);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allCountries = airports.map((airport) => {
      return airport.country;
    });
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);

  return (
    <Context.Provider
      value={{
        airports,
        setAirports,
        country,
        setCountry,
        countries,
        setCountries,
        selectedAirport,
        setSelectedAirport,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
