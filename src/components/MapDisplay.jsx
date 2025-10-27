/* eslint-disable no-undef */
// src/components/MapDisplay.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";   

// Fix default icon issue in some setups:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapDisplay({ start, end, routeCoords = [], zoom = 6 }) {
  const center = start || (routeCoords.length ? routeCoords[0] : [0, 0]);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow">
      <MapContainer center={center} zoom={zoom} className="h-full w-full" scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {start && <Marker position={start}><Popup>Start</Popup></Marker>}
        {end && <Marker position={end}><Popup>Destination</Popup></Marker>}
        {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" weight={4} />}
      </MapContainer>
    </div>
  );
}
