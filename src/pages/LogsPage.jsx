import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogs,
  fetchEntries,
  createLog,
  //   clearEntries,
} from "../features/logs/logsSlice";
import MapDisplay from "../components/MapDisplay";
import LogCard from "../components/LogCard";
import EntryCard from "../components/EntryCard";
import AddLogModal from "../components/AddLogModal";
import EntryFormModal from "../components/EntryFormModal";
import { useParams } from "react-router-dom";
import { fetchTripById } from "../features/trips/tripSlice";

export default function LogsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { logs, entries, status } = useSelector((state) => state.logs);
  const { selectedTrip } = useSelector((state) => state.trips);

  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);
  //   const [currentTrip, setCurrentTrip] = useState(null);

  //   const mockTripData = {
  //   id: 1,
  //   pickup_location: 'Kampala',
  //   pickup_latitude: 0.31361,
  //   pickup_longitude: 32.58111,
  //   dropoff_location: 'Nairobi',
  //   dropoff_latitude: 1.2833,
  //   dropoff_longitude: 36.8167,
  //   status: "ongoing",
  // };

  console.log("Logs", selectedTrip);

  useEffect(() => {
    if (id) {
      dispatch(fetchLogs(id));
      dispatch(fetchTripById(id));
    }
  }, [id, dispatch]);

  const handleSelectLog = (log) => {
    setSelectedLog(log);
    dispatch(fetchEntries(log.id));
  };

  const handleBackToLogs = () => {
    setSelectedLog(null);
    // dispatch(clearEntries());
  };

  const handleAddLog = async (logPayload) => {
    await dispatch(createLog({ ...logPayload, trip: parseInt(id, 10) }));
    setShowLogModal(false);
    dispatch(fetchLogs(id));
  };

  const extractRouteCoords = (logEntries) => {
    if (!logEntries || logEntries.length === 0) {
      return [];
    }
    // Map entries to the [latitude, longitude] array format
    return logEntries
      .map((entry) => {
        // Ensure coordinates are numbers and valid
        const lat = Number(entry.latitude);
        const lng = Number(entry.longitude);

        // Filter out invalid or zero coordinates if necessary, though MapDisplay might handle it.
        if (isNaN(lat) || isNaN(lng)) return null;

        //   return [lat, lng];
        return {
          position: [lat, lng],
          notes: entry.notes || entry.location_name,
          activity_type: entry.activity_type || "Unknown",
        };
      })
      .filter((coord) => coord !== null); // Remove any null results
  };

  const mapStart = selectedTrip
    ? [selectedTrip.pickup_latitude, selectedTrip.pickup_longitude]
    : [0.31361, 32.58111]; // Uses default values from your mock trip data

  const mapEnd = selectedTrip
    ? [selectedTrip.dropoff_latitude, selectedTrip.dropoff_longitude]
    : [1.2833, 36.8167];

//   const allLogEntries = logs.flatMap((log) => log.entries || []);
const allLogEntries = useMemo(() => logs.flatMap(log => log.entries || []), [logs]);
  const routeCoords = extractRouteCoords(allLogEntries);

  console.log("Show modal:", selectedTrip);

  return (
    <div className="relative h-screen  overflow-hidden">
      {/* 🗺 Map as full-page background */}
      <div className="absolute inset-0 z-0 width-full height-full">
        <MapDisplay
          start={mapStart}
          trip={selectedTrip}
          end={mapEnd}
          routeCoords={routeCoords}
          zoom={selectedTrip ? 10 : 8}
        />
      </div>

      {/* 🧭 Floating Side Panel */}
      <div
        className="absolute top-6 z-10 bg-white/95 backdrop-blur-md 
  rounded-xl shadow-lg h-[85vh] flex flex-col w-[370px] right-6"
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          {selectedLog ? (
            <>
              <button
                onClick={handleBackToLogs}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <h2 className="font-semibold text-lg">{selectedLog.date}</h2>
              <button
                onClick={() => setShowEntryModal(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                + Entry
              </button>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-lg">Daily Logs</h2>
              <button
                onClick={() => setShowLogModal(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                + Log
              </button>
            </>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 break-words">
          {status === "loading" ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : selectedLog ? (
            entries.length > 0 ? (
              selectedLog?.entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))
            ) : (
              <p className="text-gray-400 text-center mt-4">
                No entries yet for this log.
              </p>
            )
          ) : logs?.length > 0 ? (
            logs.map((log) => (
              <LogCard
                key={log.id}
                log={log}
                onSelect={() => handleSelectLog(log)}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center mt-4">
              No logs yet. Create your first one!
            </p>
          )}
        </div>
      </div>

      {/* Modals */}
      {showLogModal && (
        <AddLogModal
          tripId={id}
          open={showLogModal}
          onClose={() => setShowLogModal(false)}
          onSubmit={handleAddLog}
        />
      )}
      {showEntryModal && (
        <EntryFormModal
          open={showEntryModal}
          onClose={() => setShowEntryModal(false)}
          log={selectedLog}
        />
      )}
    </div>
  );
}
