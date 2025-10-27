import React from "react";

export default function EntryCard({ entry }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-md font-semibold text-gray-800 capitalize">
          {entry.activity_type}
        </h4>
        <span className="text-xs text-gray-500">
          {entry.start_hour}h - {entry.end_hour}h
        </span>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>Coords:</strong>{" "}
          {entry.coordinates
            ? `${entry.coordinates.lat}, ${entry.coordinates.lng}`
            : "N/A"}
        </p>
        {entry.notes && (
          <p>
            <strong>Notes:</strong> {entry.notes}
          </p>
        )}
      </div>
    </div>
  );
}
