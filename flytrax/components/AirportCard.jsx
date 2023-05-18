/*
  File's name: AirportCard.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getCookie } from "cookies-next";
import { Add, CommentBank, KeyboardDoubleArrowUp } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import axios from "axios";

const AirportCard = ({ aeropuertos, isFavorite, query }) => {
  const { data: session } = useSession();
  const sessionEmail = getCookie("userEmail");
  const BEARER_TOKEN = getCookie("sessionToken");

  const email = session?.user?.email || sessionEmail;
  const favURL = process.env.NEXT_PUBLIC_BACKEND_URL + "saveAirports";
  const desFavURL = process.env.NEXT_PUBLIC_BACKEND_URL + "deleteFavAirport";
  const favAirportsListURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}getFavAirports/${email}`;

  const [loading, setLoading] = useState(true);
  const [listOfFavAirports, setListOfFavAirports] = useState([]);
  const [cardSelected, setCardSelected] = useState([]);

  const [noOfElement, setnoOfElement] = useState(12);
  const slice = aeropuertos
    .filter((airport) => {
      if (query === "") {
        return airport;
      } else if (
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.iata_code.toLowerCase().includes(query.toLowerCase())
      ) {
        return airport;
      }
    })
    .slice(0, noOfElement);

  // Alerta de información
  const [showAlertInfo, setShowAlertInfo] = useState(false);

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

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlertInfo(false);
  };

  const viewInfo = (card) => {
    setCardSelected(card);
    setShowAlertInfo(true);
    console.log(card);
  };

  const favAirport = async (iata_code) => {
    console.log("Adding favorite airport...");

    const data = {
      email: email,
      iata: iata_code,
    };

    await axios
      .post(favURL, data, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Airport saved");
          getFavAirports();
        } else {
          alert("Error al favear aeropuerto");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error al favear aeropuerto");
      });
  };

  const deleteFavAirport = async (iata_code) => {
    console.log("Deleting favorite airport...");

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
          console.log("Airport delete from favs");
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

  useEffect(() => {
    getFavAirports();
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  function isFavorite(airport) {
    return listOfFavAirports.find((componente) => componente.iata === airport);
  }

  return (
    <div className="container mx-auto px-8 w-full h-full">
      <div className="grid xl:-mt-5 xl:grid-cols-4 lg:grid-cols-3 lg:mt-0 md:grid-cols-2 md:mt-5 grid-cols-1 mt-20 gap-6 z-10">
        {slice.map((card, index) => {
          let countryCode = card.country_code;
          let flagUrl = `https://www.countryflagicons.com/FLAT/64/${countryCode}.png`;
          return card.iata_code ? (
            <div
              key={index}
              onClick={() => viewInfo(card)}
              className="shadow-lg rounded-lg bg-slate-100 bg-opacity-75 transform transition duration-200 hover:scale-105 relative"
            >
              {isFavorite(card.iata_code) ? (
                <div className="p-5 z-20">
                  <AiFillHeart
                    className="absolute right-2 mb-5 text-red-700 cursor-pointer"
                    size={30}
                    onClick={() => deleteFavAirport(card.iata_code)}
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
                      {card.iata_code}
                    </h3>
                  </div>
                  <p className="text-lg font-normal text-gray-600">
                    {card.name}
                  </p>
                </div>
              ) : (
                <div className="p-5 z-20">
                  <AiOutlineHeart
                    className="absolute right-2 mb-5 cursor-pointer"
                    size={30}
                    onClick={() => favAirport(card.iata_code)}
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
                      {card.iata_code}
                    </h3>
                  </div>
                  <p className="text-lg font-normal text-gray-600">
                    {card.name}
                  </p>
                </div>
              )}
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
          <Link
            className="font-semibold hover:underline transition ease-in duration-200"
            href={`/airport/${cardSelected.iata_code}`}
          >
            Ver más información.
          </Link>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AirportCard;
