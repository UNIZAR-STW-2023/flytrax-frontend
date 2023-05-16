import React, { useState, useEffect, Fragment } from "react";
import { Loader } from "../../components";
import CommunityCard from "../../components/foro/CommunityCard";
import { InfoOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { getCookie } from "cookies-next";

const CommunityHome = () => {
  const [query, setQuery] = useState("");
  const [airports, setAirports] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(true);

  const email = getCookie("userEmail");

  const inputQuery = (e) => {
    setQuery(e.target.value);
  };

  /* Cada vez que cambie el valor de selected entonces se filtra */
  useEffect(() => {
    const getAirports = async () => {
      let aeropuertos = [];

      await fetch("/assets/data/[AirLabs]_Airports.json")
        .then((response) => response.json())
        .then((data) => {
          // Use the data from the JSON file
          aeropuertos.push(...data.response);
          setAirports(
            aeropuertos.filter(
              (object) =>
                object.iata_code !== undefined && object.iata_code !== null
            )
          );
        })
        .catch((error) => console.error(error));
    };
    getAirports();
    setTimeout(() => setLoading(false), 1500);
  }, [selectedCountry]);

  return !loading ? (
    <div className="flex flex-col min-h-[70vh] justify-center items-center align-middle m-auto w-11/12 max-sm:w-10/12 my-24 select-none">
      <div
        id="list-top"
        className="flex flex-col items-center align-middle justify-center w-full my-10"
      >
        <div className="w-full flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
          Foros de aeropuertos
        </div>
        <div className="flex flex-col w-full align-middle items-center justify-center gap-3">
          <div className="flex justify-between gap-2 shadow-gray-800 shadow-sm bg-slate-500 hover:bg-slate-700 rounded-lg p-2 w-full md:w-1/2 xl:w-1/3 transition ease-in-out duration-200">
            <SearchIcon sx={{ color: "white" }} />
            <input
              className="bg-transparent outline-none placeholder-slate-300 text-zinc-100 w-full"
              value={query}
              type="search"
              placeholder="Busca aquí un foro..."
              onChange={inputQuery}
            />
          </div>
        </div>
        <div className="lg:mt-12 w-full">
          <CommunityCard aeropuertos={airports} query={query} />
        </div>
      </div>
    </div>
  ) : (
    <Loader value={"listado de foros"} />
  );
};

export default CommunityHome;
