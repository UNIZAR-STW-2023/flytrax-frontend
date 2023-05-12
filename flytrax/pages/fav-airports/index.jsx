import React, { useState, useEffect, Fragment } from "react";
import { Banner, AirportCard } from "../../components";
import FavAirportCard from "../../components/FavAirportCard";
import { FaTrashAlt } from "react-icons/fa";
import { useStateContext } from "../../context/StateContext";
import { aeropuertos } from "../../assets/dummy/aeropuertos_iata";
import { getCookie } from "cookies-next";
import axios from "axios";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";

const FavAirports = () => {

  const [airports, setAirports] = useState(aeropuertos);

  const [listOfFavAirports, setListOfFavAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = getCookie('userEmail')
  const favAirportsListURL = `https://flytrax-backend.vercel.app/getFavAirports/${email}`;
  const BEARER_TOKEN = getCookie("sessionToken");

  const getFavAirports = async () => {
    await axios.get(favAirportsListURL, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        }
      }).then((res) => {
        if (res.status === 200) {
          console.log("Fav airports list");
          setListOfFavAirports(res.data);
        } else {
          console.log("Failed to get list of favorites")
        }
      })
  }

  useEffect(() => {
    getFavAirports();
    setLoading(false);
    console.log('List of favorites', listOfFavAirports);
  }, [])
  
  return (
    <div className="flex flex-col justify-center items-center align-middle m-auto w-10/12 my-24 select-none">

        <h1 className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
          Tus aeropuertos  <span className="text-red-700 ml-1"> Favoritos </span>
        </h1>
            
        {/* Airport Cards */}      
        <FavAirportCard aeropuertos={listOfFavAirports} />
    </div>
  );
};

export default FavAirports;
