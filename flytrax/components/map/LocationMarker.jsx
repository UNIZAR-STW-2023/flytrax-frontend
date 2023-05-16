/*
  File's name: LocationMarker.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";

const LocationMarker = ({ value, data }) => {
  // Define a custom icon
  const userLocation = L.icon({
    iconUrl: "/assets/icons/user_location.png",
    iconSize: [30, 30],
    popupAnchor: [0, -15],
  });

  const [position, setPosition] = useState(value);

  const map = useMapEvents({
    click() {
      setPosition(value);
      map.flyTo(value, 13);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={userLocation}>
      <Popup>
        <Link href={`/airport/${data.iata_code}`}>
          {data.name} ({data.iata_code})
        </Link>
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
