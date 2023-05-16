import React, { useState, useEffect, Fragment } from "react";
import { Banner, AirportCard, Loader } from "../../components";
import FavAirportCard from "../../components/FavAirportCard";
import countries from "../../assets/dummy/countries";
import { getCookie } from "cookies-next";
import axios from "axios";
import { InfoOutlined } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Snackbar, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

const FavAirports = () => {
  const [listOfFavAirports, setListOfFavAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = getCookie("userEmail");
  const favAirportsListURL = `https://flytrax-backend.vercel.app/getFavAirports/${email}`;
  const BEARER_TOKEN = getCookie("sessionToken");

  const [query, setQuery] = useState("");
  const [airports, setAirports] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredAirports, setFilteredAirports] = useState(airports);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Alerta de información
  const [showAlertInfo, setShowAlertInfo] = useState(false);

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlertInfo(false);
  };

  const inputQuery = (e) => {
    setQuery(e.target.value);
  };

  const filterAirports = (selectedCountry) => {
    if (isFiltered === false) {
      if (selectedCountry === "") {
        deleteFilter();
      } else {
        let aeropuertos = [];
        aeropuertos.push(...listOfFavAirports);
        console.log(aeropuertos);
        setFilteredAirports(
          aeropuertos.filter(
            (object) => object.country_code === selectedCountry
          )
        );
        setIsFiltered(true);
      }
    } else {
      deleteFilter();
    }
  };

  const deleteFilter = () => {
    setIsFiltered(false);
    setFilteredAirports(listOfFavAirports);
  };

  useEffect(() => {
    const getFavAirports = async () => {
      await axios
        .get(favAirportsListURL, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setListOfFavAirports(res.data);
            setFilteredAirports(res.data);
          } else {
            console.log("Failed to get list of favorites");
          }
        });
    };

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
    getFavAirports();
    setTimeout(() => setLoading(false), 5000);
    // eslint-disable-next-line
  }, [selectedCountry]);

  console.log(filteredAirports);

  return !loading ? (
    <div className="flex flex-col min-h-[70vh] justify-center items-center align-middle m-auto w-11/12 max-sm:w-10/12 my-24 select-none">
      <div
        id="list-top"
        className="flex flex-col items-center align-middle justify-center w-full my-10"
      >
        <div className="w-full flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
          Aeropuertos favoritos
          <InfoOutlined
            className="cursor-pointer"
            onClick={() => setShowAlertInfo(true)}
            color="info"
            fontSize="medium"
          />
        </div>
        <div className="flex flex-col w-full align-middle items-center justify-center gap-3">
          <div className="flex align-middle items-center justify-center w-full md:w-1/2 xl:w-1/3 gap-4 mx-10 h-full">
            <Autocomplete
              selectedCountry={selectedCountry}
              onInputChange={(event, newSelectedCountry) =>
                setSelectedCountry(newSelectedCountry)
              }
              sx={{ width: "100%", height: "100%" }}
              required
              autoHighlight
              id="combo-box-demo"
              options={countries}
              getOptionLabel={(option) => option.code}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {/* eslint-disable-next-line */}
                  <img
                    src={`https://flagcdn.com/20x15/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/40x30/${option.code.toLowerCase()}.png 2x`}
                    width="20"
                    height="15"
                    alt={option.name}
                  />
                  {option.name} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  label="Selecciona un país"
                  variant="filled"
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "country", // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <button
              className={`w-14 h-14 text-white ${
                isFiltered
                  ? "bg-orange-600 hover:bg-orange-800 transition ease-in duration-200"
                  : "bg-indigo-600 hover:bg-indigo-800 transition ease-in duration-200"
              } rounded-md shadow-md`}
              onClick={() => filterAirports(selectedCountry)}
            >
              {isFiltered ? <FilterAltOffIcon /> : <FilterAltIcon />}
            </button>
          </div>
          <div className="flex justify-between gap-2 shadow-gray-800 shadow-sm bg-slate-500 hover:bg-slate-700 rounded-lg p-2 w-full md:w-1/2 xl:w-1/3 transition ease-in-out duration-200">
            <SearchIcon sx={{ color: "white" }} />
            <input
              className="bg-transparent outline-none placeholder-slate-300 text-zinc-100 w-full"
              value={query}
              type="search"
              placeholder="Busca aquí un aeropuerto..."
              onChange={inputQuery}
            />
          </div>
        </div>
        <div className="lg:mt-12 w-full">
          <FavAirportCard aeropuertos={filteredAirports} query={query} />
        </div>
      </div>
      <Snackbar
        message="Filtra por país para hacer tu búsqueda más sencilla."
        open={showAlertInfo}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="info">
          Filtra por <strong>país</strong> para hacer tu búsqueda más sencilla.
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <Loader value={"listado de favoritos"} />
  );
};

export default FavAirports;
