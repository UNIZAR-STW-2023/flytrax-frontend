// components/Map.jsx
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import LocationMarker from "./LocationMarker";
import MinimapControl from "./MinimapControl";

const Map = ({ latitude, longitude }) => {
  // Posición actual del usuario
  const position = [latitude, longitude];

  return (
    <div id="map">
      <MapContainer
        center={position}
        zoom={13}
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
        <MinimapControl position="topright" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
