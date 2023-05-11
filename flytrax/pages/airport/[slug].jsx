import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FlightPanel, Loader } from "../../components";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { Alert, Snackbar, Typography } from "@mui/material";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import NotFound from "../404";
import axios from "axios";

const AirportDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const AirLabs_API_KEY = process.env.NEXT_PUBLIC_AIRLABS_API_KEY;
  const AirLabs_URL = `https://airlabs.co/api/v9/airports?iata_code=${slug}&api_key=${AirLabs_API_KEY}`;

  const [airport, setAirport] = useState(null);
  const [details, setDetails] = useState([]);
  const [showDepartures, setShowDepartures] = useState(true);
  const [loading, setLoading] = useState(true);

  // Alerta de información
  const [showAlertInfo, setShowAlertInfo] = useState(false);

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlertInfo(false);
  };

  useEffect(() => {
    const checkAirport = async (slug) => {
      let aeropuertos = [];

      await fetch("/assets/data/[AirLabs]_Airports.json")
        .then((response) => response.json())
        .then((data) => {
          // Use the data from the JSON file
          aeropuertos.push(...data.response);
          const currentAirport = aeropuertos.find(
            (elem) => elem.iata_code === slug
          );
          if (currentAirport === undefined) {
            setAirport(null);
          } else {
            setAirport(currentAirport.iata_code);
          }
        })
        .catch((error) => console.error(error));
    };

    const getAirportDetails = async () => {
      await axios
        .get(AirLabs_URL)
        .then((response) => {
          setDetails(response.data.response[0]);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        });
    };

    checkAirport(slug);
    getAirportDetails();
    setTimeout(() => setLoading(false), 1500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug, router.isReady, airport, setAirport]);

  return !loading ? (
    airport !== null && airport !== undefined ? (
      <>
        <div className="flex flex-col justify-center items-center align-middle m-auto w-10/12 my-24 select-none">
          <h1 className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
            {details.name}{" "}
            <h2 className="flex items-center align-middle justify-center">
              <h3 className="max-sm:w-fit max-sm:self-center border-2 border-gray-500 rounded-lg text-gray-500 text-2xl px-1 mx-2 font-normal">
                {details.iata_code}
              </h3>
              <InfoOutlined
                className="cursor-pointer"
                onClick={() => setShowAlertInfo(true)}
                color="info"
                fontSize="medium"
              />
            </h2>
          </h1>
          <div className="flex gap-2 text-yellow-400 font-mono my-2 w-full align-middle items-center px-3 bg-gray-900 rounded-md h-20 py-3 uppercase">
            <button
              className="flex gap-2 align-middle items-center text-center justify-center"
              onClick={() => setShowDepartures(!showDepartures)}
            >
              {showDepartures ? (
                <FlightTakeoffIcon sx={{ fontSize: 45 }} />
              ) : (
                <FlightLandIcon sx={{ fontSize: 45 }} />
              )}
              <Typography
                sx={{
                  fontFamily: "Oswald",
                  fontSize: 45,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  transition: "color 200ms ease-in-out", // Equivalent to transition ease-in-out duration-200
                  "&:hover": {
                    // Equivalent to hover:bg-gray-700
                    color: "#f8fafc",
                  },
                  color: "#facc15",
                }}
              >
                {showDepartures ? "Salidas" : "Llegadas"}
              </Typography>
            </button>
          </div>
          <FlightPanel showDepartures={showDepartures} airport={airport} />
          <Snackbar
            message={`Pulsa en la cabecera de ${
              showDepartures ? "Salidas" : "Llegadas"
            } para cambiar de vista.`}
            open={showAlertInfo}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleClose} severity="info">
              Pulsa en la cabecera de{" "}
              {showDepartures ? (
                <strong>SALIDAS</strong>
              ) : (
                <strong>LLEGADAS</strong>
              )}{" "}
              para cambiar de vista.
            </Alert>
          </Snackbar>
        </div>
        <button
          onClick={() => router.back()}
          className="flex gap-2 hover:text-orange-600 transition ease-in-out duration-200 font-semibold uppercase text-2xl align-middle items-center w-40 m-5"
        >
          <ArrowBack /> Volver
        </button>
      </>
    ) : (
      <NotFound />
    )
  ) : (
    <Loader />
  );
};

export default AirportDetails;
