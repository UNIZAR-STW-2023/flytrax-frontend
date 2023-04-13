import React, { useState, useEffect } from "react";
import Map from "../../components/map/index";
import { Alert, Snackbar } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Loading from "../../components/Loader";

const MapRendered = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);
  const [latitude, setLatitude] = useState(41.6533533620931); // Default latitude
  const [longitude, setLongitude] = useState(-0.8903464782373229); // Default longitude

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
    // Fetch user cookie value
    const sessionCookie = getCookie("loggedIn");

    if (!sessionCookie) {
      // Redirect to login page if user is not authenticated
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } else {
      // Update state with user cookie value
      setUser(sessionCookie);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [router]);

  return user ? (
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
        <Map latitude={latitude} longitude={longitude} />
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
          Activa la ubicación y haz clic en el mapa para ver tu posición actual
          (o reubicarte).
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <Loading />
  );
};

export default MapRendered;
