/*
  File's name: FavAirportCard.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { getCookie } from "cookies-next";
import { Add, KeyboardDoubleArrowUp } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";

const FavAirportCard = ({ aeropuertos, query }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [listOfFavAirports, setListOfFavAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noOfElement, setnoOfElement] = useState(12);
  const [cardSelected, setCardSelected] = useState([]);

  // Alerta de información
  const [showAlertInfo, setShowAlertInfo] = useState(false);

  const slice = aeropuertos
    .filter((airport) => {
      if (query === "") {
        return airport;
      } else if (
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.iata.toLowerCase().includes(query.toLowerCase())
      ) {
        return airport;
      }
    })
    .slice(0, noOfElement);

  const sessionEmail = getCookie("userEmail");
  const BEARER_TOKEN = getCookie("sessionToken");
  const email = session?.user?.email || sessionEmail;
  const favAirportsListURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}getFavAirports/${email}`;
  const desFavURL = process.env.NEXT_PUBLIC_BACKEND_URL + "deleteFavAirport";

  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement);
  };

  const scrollToTop = () => {
    const element = document.getElementById("list-top");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const viewInfo = (card) => {
    setCardSelected(card);
    setShowAlertInfo(true);
  };

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlertInfo(false);
  };

  const deleteFavAirport = async (iata_code) => {
    const data_des = {
      email: email,
      iata: iata_code,
    };

    await axios
      .post(desFavURL, data_des, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          getFavAirports();
        } else {
          alert("Error al desfavear aeropuerto");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error al desfavear aeropuerto");
      });
  };

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
        } else {
          console.log("Failed to get list of favorites");
        }
      });
  };

  function isFavorite(airport) {
    //return listOfFavAirports.includes(airport);
    return listOfFavAirports.find((componente) => componente.iata === airport);
  }

  useEffect(() => {
    getFavAirports();
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mx-auto px-8 w-full h-full">
      <div className="grid xl:-mt-5 xl:grid-cols-4 lg:grid-cols-3 lg:mt-0 md:grid-cols-2 md:mt-5 grid-cols-1 mt-20 gap-6 z-10">
        {slice.map((card, index) => {
          let countryCode = card.country_code;
          let flagUrl = `https://www.countryflagicons.com/FLAT/64/${countryCode}.png`;
          return isFavorite(card.iata) ? (
            <div
              key={index}
              onClick={() => viewInfo(card)}
              className="shadow-lg rounded-lg bg-slate-100 bg-opacity-75 transform transition duration-200 hover:scale-105 relative"
            >
              <div className="p-5 z-20">
                <AiFillHeart
                  className="absolute right-2 mb-5 text-red-700 cursor-pointer"
                  size={30}
                  onClick={() => deleteFavAirport(card.iata)}
                />
                <div className="flex flex-row items-center gap-3">
                  <Image
                    className="rounded-t-lg"
                    src={flagUrl}
                    width={64}
                    height={64}
                    alt=""
                  />
                  <h3 className="text-3xl font-bold text-slate-700 mb-3">
                    {card.iata}
                  </h3>
                </div>
                <p className="text-lg font-normal text-gray-600">{card.name}</p>
              </div>
            </div>
          ) : null;
        })}
      </div>

      {slice.length >= 12 ? (
        <div className="flex mt-12">
          <button
            data-test="more-button"
            type="button"
            className="flex pl-10  align-middle items-center w-full justify-center py-4 text-xl uppercase font-bold text-slate-800 hover:text-cyan-600 transition ease-in-out duration-200"
            onClick={loadMore}
          >
            <Add /> <h2>Ver más</h2>
          </button>
          <button
            data-test="more-button"
            type="button"
            className="flex px-3 sm:px-5 align-middle items-center w-fit justify-center py-4 text-xl uppercase font-bold text-slate-800 hover:text-cyan-600 transition ease-in-out duration-200"
            onClick={scrollToTop}
          >
            <KeyboardDoubleArrowUp />
          </button>
        </div>
      ) : null}
      <Snackbar
        message={`${cardSelected.name}. Ver más información.`}
        open={showAlertInfo}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="info">
          {cardSelected.name}.{" "}
          <button
            className="font-semibold hover:underline transition ease-in duration-200"
            onClick={() => router.push(`/airport/${cardSelected.iata}`)}
          >
            Ver más información.
          </button>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FavAirportCard;
