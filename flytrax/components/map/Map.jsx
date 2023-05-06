// components/Map.jsx
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import LocationMarker from "./LocationMarker";
import MinimapControl from "./MinimapControl";
import SwipeableEdgeDrawer from "../Sidebar";
import axios from "axios";
import Loader from "../Loader";
import { getDistance } from "geolib";
import { useCallback } from "react";
import { Navigation } from "@mui/icons-material";

const BDC_API_KEY = "bdc_e893cb5013564fd3946b1cdad776c2e9";

const Map = ({ latitude, longitude }) => {
  const DEFAULT_POSITION = [latitude, longitude];

  // Posición actual del usuario
  const [position, setPosition] = useState([latitude, longitude]);
  const [country, setCountry] = useState([]);
  const [airports, setAirports] = useState([]);
  const [distance, setDistance] = useState([]);
  const [matchingAirports, setMatchingAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  const BDC_URL = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${BDC_API_KEY}`;
  const AirLabs_URL = `https://airlabs.co/api/v9/airports?country_code=${country}&api_key=a06c41d2-1fc4-4d92-864e-fd641accfa06`;

  // Define a custom icon
  const airportLocation = L.icon({
    iconUrl: "/assets/icons/map_pin.png",
    iconSize: [30, 30],
    popupAnchor: [0, -15],
  });

  // Define a custom icon
  const userLocation = L.icon({
    iconUrl: "/assets/icons/user_location.png",
    iconSize: [30, 30],
    popupAnchor: [0, -15],
  });

  useEffect(() => {
    // Fetch user country
    const getCountryFromLocation = async () => {
      await axios
        .get(BDC_URL)
        .then((response) => {
          setCountry(response.data.countryCode);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        });
    };

    const getAirports = async () => {
      /* await axios
        .get(AirLabs_URL)
        .then((response) => {
          setAirports(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        }); */
      let distancias = [];
      let aeropuertos = [];

      await fetch("assets/data/[AirLabs]_Airports.json")
        .then((response) => response.json())
        .then((data) => {
          // Use the data from the JSON file
          aeropuertos = data.response;
          setAirports(data.response);
          aeropuertos.map((airport) => {
            const distance = getDistance(
              { latitude: latitude, longitude: longitude },
              { latitude: airport.lat, longitude: airport.lng }
            );
            if (distance / 1000 < 300 && airport.iata_code != null) {
              distancias.push({
                iata_code: airport.iata_code,
                dist: (distance / 1000).toFixed(2),
              });
            }
          });
          setDistance(distancias);
          console.log(distance);
          const matching = aeropuertos.filter((o1) =>
            distancias.some((o2) => o1.iata_code === o2.iata_code)
          );
          setMatchingAirports(matching);
          console.log(matching);
        })
        .catch((error) => console.error(error));
    };
    getCountryFromLocation();
    getAirports();
    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Controlar posición del usuario
  const [value, setValue] = useState(DEFAULT_POSITION);
  const [data, setData] = useState("Estás aquí");

  const handleChildValue = useCallback(
    (childValue) => {
      setValue(childValue);
    },
    [setValue]
  );

  const handleChildData = useCallback(
    (childData) => {
      setData(childData);
    },
    [setData]
  );

  const handleResetLocation = () => {
    setValue(DEFAULT_POSITION);
    setData({ name: "Estás aquí", iata_code: "" });
  };

  return !loading ? (
    <div id="map">
      <div className="flex gap-2 max-sm:justify-between">
        <SwipeableEdgeDrawer
          latitude={latitude}
          longitude={longitude}
          onValueChange={handleChildValue}
          onDataChange={handleChildData}
        />
        <button
          className="flex justify-center max-sm:w-1/2 align-middle items-center reset_btn gap-1 my-3 px-2 text-slate-50 uppercase rounded-xl shadow-md h-10"
          onClick={handleResetLocation}
        >
          <Navigation /> <h2 className="font-regular">Reset</h2>
        </button>
      </div>
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={false}
        style={{
          height: "80vh",
          width: "100%",
          border: "2px solid #27272A",
          borderRadius: "10px",
          boxShadow: "0 0 2px #27272A",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Circle center={position} radius={300000}>
          {value === DEFAULT_POSITION ? (
            <Marker center={position} position={position} icon={userLocation}>
              <Popup>
                <span>Estás aquí</span>
              </Popup>
            </Marker>
          ) : null}
        </Circle>
        {matchingAirports.map((coord, index) => (
          <Marker
            key={index}
            position={[coord.lat, coord.lng]}
            icon={airportLocation}
          >
            <Popup>
              <span>
                {coord.name} ({coord.iata_code})
              </span>
            </Popup>
          </Marker>
        ))}
        <MinimapControl position="topright" />
        <LocationMarker value={value} data={data} />
      </MapContainer>
    </div>
  ) : (
    <Loader />
  );
};

export default Map;
