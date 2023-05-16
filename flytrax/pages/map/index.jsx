/*
  File's name: /map/index.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState, useEffect } from "react";
import Map from "../../components/map/index";
import { Alert, Snackbar, SwipeableDrawer } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Loader from "../../components/Loader";
import { useSession } from "next-auth/react";

const MapRendered = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const SESSION_COOKIE = getCookie("sessionToken");
  const BDC_API_KEY = "bdc_e893cb5013564fd3946b1cdad776c2e9";

  const [user, setUser] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(41.6533533620931); // Default latitude
  const [longitude, setLongitude] = useState(-0.8903464782373229); // Default longitude
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
    // Fetch user country
    const getCountryFromLocation = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${BDC_API_KEY}`
        );
        const data = await response.json();
        const countryCode = data.countryCode;
        setCountry(countryCode);
      } catch (error) {
        console.error("Failed to get country from location:", error);
      }
      setTimeout(() => setLoading(false), 1500);
    };

    // Fetch user cookie value
    const sessionCookie = getCookie("sessionToken");

    if (sessionCookie === null) {
      // Redirect to login page if user is not authenticated
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } else {
      // Update state with user cookie value
      setUser(sessionCookie);
    }

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLatitude(latitude);
            setLongitude(longitude);
            getCountryFromLocation(latitude, longitude);
          },
          (error) => {
            console.error("Failed to get user location: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, [router, user, setUser]);

  return !loading ? (
    user || session ? (
      <div className="flex flex-col items-center align-middle m-auto w-full my-24">
        <h1 className="my-10 text-black font-bold max-sm:text-3xl sm:text-4xl">
          Mapa de aeropuertos{" "}
          <InfoOutlined
            className="ml-2 cursor-pointer"
            onClick={() => setShowAlertInfo(true)}
            color="info"
            fontSize="medium"
          />
        </h1>
        <div className="w-full px-5 lg:px-10">
          <Map latitude={latitude} longitude={longitude} country={country} />
        </div>
        <Snackbar
          message="Activa la ubicación y haz clic en el mapa para ver tu posición actual (o reubicarte)."
          open={showAlertInfo}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert onClose={handleClose} severity="info">
            Activa la ubicación y haz clic en el mapa para ver tu posición
            actual (o reubicarte).
          </Alert>
        </Snackbar>
      </div>
    ) : (
      <Loader />
    )
  ) : (
    <Loader />
  );
};

export default MapRendered;
