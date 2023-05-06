import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

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
        {data.name} ({data.iata_code})
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
