import React from "react";
import api from "../services/api";

export default function LogCard({ log, onSelect }) {
    console.log("Rendering LogCard for log:", log);
  const handleDownloadPDF = async (e) => {
    e.stopPropagation();

    try {
      // Create full endpoint URL for your backend
      //   const url = `${API_BASE_URL}/api/logs/${log.id}/pdf/`;
      const url = `/logs/${log.id}/pdf/`;

      const response = await api.get(url, {
        responseType: "blob",
      });

      const blob = response.data;
      const blobUrl = window.URL.createObjectURL(blob);

      // Create and click a temporary link to trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `log_${log.id}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download log PDF.");
    }
  };

  return (
    <div
      // Clicking anywhere in the card, except buttons, triggers selection
      onClick={onSelect}
      className="cursor-pointer bg-white/80 backdrop-blur-md rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-blue-500"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {new Date(log.date).toLocaleDateString()}
        </h3>
        <span className="text-sm text-gray-500">{log.total_miles || 0} mi</span>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>Pickup:</strong> {log.pickup_location || "N/A"}
        </p>
        <p>
          <strong>Dropoff:</strong> {log.dropoff_location || "N/A"}
        </p>
        <p>
          <strong>Trailer:</strong> {log.trailer_or_plate || "N/A"}
        </p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        {/* Action Buttons */}
        <div className="flex space-x-2">
          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            title="Download Log as PDF"
            className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
          >
            {/* Simple PDF Icon (using inline SVG for portability) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l4 4v11a2 2 0 0 1-2 2z"></path>
              <path d="M12 11v6"></path>
              <path d="m9.5 14.5 2.5 2.5 2.5-2.5"></path>
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(log.id);
            }}
            title="Delete Log"
            className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
          >
            {/* Simple Trash Icon (using inline SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
              <path d="M15 6V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2"></path>
            </svg>
          </button>
        </div>

        {/* View Entries Button (Kept functionality) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          View Entries →
        </button>
      </div>
    </div>
  );
}
