import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FlightPanel } from "../../components";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { Alert, Snackbar, Typography } from "@mui/material";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import axios from "axios";

const AirportDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const AirLabs_API_KEY = "02a4e640-3534-45db-a3dd-186c1c5a9325";
  const AirLabs_URL = `https://airlabs.co/api/v9/airports?iata_code=${slug}&api_key=${AirLabs_API_KEY}`;

  const [details, setDetails] = useState([]);
  const [showDepartures, setShowDepartures] = useState(true);

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

    getAirportDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug, router.isReady]);

  return (
    <>
      <div className="flex flex-col justify-center items-center align-middle m-auto w-10/12 my-24 select-none">
        <h1 className="my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
          {details.name} ({details.iata_code})
          <InfoOutlined
            className="ml-2 cursor-pointer"
            onClick={() => setShowAlertInfo(true)}
            color="info"
            fontSize="medium"
          />
        </h1>
        <div className="flex gap-2 text-yellow-400 font-mono my-2 w-full align-middle items-center px-3 bg-gray-900 rounded-md h-20 py-3 uppercase">
          <button
            className="flex gap-2 align-middle items-center text-center justify-center"
            onClick={() => setShowDepartures(!showDepartures)}
          >
            {showDepartures ? (
              <FlightTakeoffIcon className="text-5xl" />
            ) : (
              <FlightLandIcon className="text-5xl" />
            )}
            <Typography
              sx={{
                fontFamily: "Oswald",
                fontSize: 45,
                fontWeight: 400,
                textTransform: "uppercase",
              }}
            >
              {showDepartures ? "Salidas" : "Llegadas"}
            </Typography>
          </button>
        </div>
        <FlightPanel showDepartures={showDepartures} airport={slug} />
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
  );
};

export default AirportDetails;
