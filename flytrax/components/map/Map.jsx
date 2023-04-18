// components/Map.jsx
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import LocationMarker from "./LocationMarker";
import MinimapControl from "./MinimapControl";
import axios from "axios";

const BDC_API_KEY = "bdc_e893cb5013564fd3946b1cdad776c2e9";

const Map = ({ latitude, longitude }) => {
  // Posición actual del usuario
  const position = [latitude, longitude];
  const [country, setCountry] = useState([]);
  const [airports, setAirports] = useState([]);

  const BDC_URL = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${BDC_API_KEY}`;
  const AirLabs_URL = `https://airlabs.co/api/v9/airports?country_code=${country}&api_key=a06c41d2-1fc4-4d92-864e-fd641accfa06`;

  const coordinates = [
    [51.5074, -0.1278], // London, UK
    [40.7128, -74.006], // New York City, USA
    [48.8566, 2.3522], // Paris, France
    [35.6895, 139.6917], // Tokyo, Japan
  ];

  // Define a custom icon
  const airportLocation = L.icon({
    iconUrl: "/icons/map_pin.png",
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
      await axios
        .get(AirLabs_URL)
        .then((response) => {
          setAirports(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        });
    };

    getCountryFromLocation();
    getAirports();
  }, []);

  return (
    <div id="map">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
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
        {coordinates.map((coord, index) => (
          <Marker key={index} position={coord} icon={airportLocation}>
            <Popup>
              <span>Marker {index + 1}</span>
            </Popup>
          </Marker>
        ))}
        <MinimapControl position="topright" />
        <LocationMarker center={position} />
      </MapContainer>
    </div>
  );
};

export default Map;
