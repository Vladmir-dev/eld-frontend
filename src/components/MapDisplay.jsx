/* eslint-disable no-undef */
// src/components/MapDisplay.jsx
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
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

export default function MapDisplay({ start, end, trip, routeCoords = [], zoom = 6 }) {
  const polylineCoords = routeCoords.map((entry) => entry.position);
  const center = start || (routeCoords.length ? routeCoords[0] : [0, 0]);

  console.log("Trip", trip)

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Start and End Markers */}
        {start && (
          <Marker position={start}>
            <Popup>Trip Start: {trip?.pickup_location}</Popup>
          </Marker>
        )}
        {end && (
          <Marker position={end}>
            <Popup>Trip Destination: {trip?.dropoff_location}</Popup>
          </Marker>
        )}

        {/* Plotting all Log Entries with Popups (The requested feature) */}
        {routeCoords.map((entry, index) => (
          <Marker key={index} position={entry.position}>
            <Popup>
              <div className="font-sans text-sm p-1">
                <p className="font-bold mb-1 text-blue-700">
                  {entry.activity_type.replace("_", " ")}
                </p>
                <p className="text-gray-700">
                  {entry.notes || (
                    <span className="italic text-gray-500">
                      No notes provided.
                    </span>
                  )}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Drawing the path line */}
        {polylineCoords.length > 0 && (
          <Polyline positions={polylineCoords} color="#4F46E5" weight={4} />
        )}
      </MapContainer>
    </div>
  );
}
