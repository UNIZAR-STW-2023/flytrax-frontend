import React, { useState } from "react";
import { Circle, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

const LocationMarker = () => {
  // Define a custom icon
  const userLocation = L.icon({
    iconUrl: "/assets/icons/user_location.png",
    iconSize: [30, 30],
    popupAnchor: [0, -15],
  });

  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Circle center={position} radius={300000}>
      <Marker position={position} icon={userLocation}>
        <Popup>Estás aquí</Popup>
      </Marker>
    </Circle>
  );
};

export default LocationMarker;
