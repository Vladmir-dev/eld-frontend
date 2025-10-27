// src/components/SidePanel.jsx
import React from "react";

export default function SidePanel({
  trip,
  logs = [],
  entries = [],
  view = "logs",
  selectedLog = null,
  onSelectLog,
  onBack,
  onAddLog,
  onAddEntry,
  loading = false,
}) {
  return (
    <div className="h-full bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          {view === "entries" ? (
            <button onClick={onBack} className="p-1 rounded hover:bg-gray-100">
              ←
            </button>
          ) : null}
          <div>
            <h3 className="text-lg font-semibold">
              {view === "logs" ? "Logs" : "Entries"}
            </h3>
            {trip && <div className="text-xs text-gray-500">{trip.pickup_location} → {trip.dropoff_location}</div>}
          </div>
        </div>

        <div>
          {view === "logs" ? (
            <button
              onClick={onAddLog}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              + Add Log
            </button>
          ) : (
            <button
              onClick={onAddEntry}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              + Add Entry
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && <div className="text-center text-gray-500">Loading…</div>}

        {view === "logs" ? (
          logs.length > 0 ? (
            logs.map((log) => (
              <div
                key={log.id}
                onClick={() => onSelectLog(log)}
                className="cursor-pointer p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{log.date}</div>
                    <div className="text-xs text-gray-500">{log.pickup_location} → {log.dropoff_location}</div>
                  </div>
                  <div className="text-xs text-gray-600">{log.total_miles_driven ? `${log.total_miles_driven} mi` : "-"}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-gray-500 pt-6">No logs available yet</div>
          )
        ) : (
          /* entries view */
          <>
            {selectedLog ? (
              <>
                <div className="mb-2 text-sm text-gray-600">Log date: <strong>{selectedLog.date}</strong></div>
                {entries.length > 0 ? (
                  entries.map((e) => (
                    <div key={e.id} className="p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{e.activity_type.replace("_", " ")}</div>
                          <div className="text-xs text-gray-500">{e.start_hour}:00 — {e.end_hour}:00</div>
                          <div className="text-xs text-gray-600 mt-2 italic">{e.notes || "—"}</div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {e.latitude && e.longitude ? `${parseFloat(e.latitude).toFixed(3)}, ${parseFloat(e.longitude).toFixed(3)}` : "—"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-500 pt-6">No entries yet</div>
                )}
              </>
            ) : (
              <div className="text-center text-sm text-gray-500 pt-6">Select a log to view entries</div>
            )}
          </>
        )}
      </div>

      {/* Footer - quick stats */}
      <div className="px-4 py-3 border-t bg-white text-xs text-gray-600">
        <div className="flex justify-between">
          <div>Logs: <strong>{logs.length}</strong></div>
          <div>Entries: <strong>{entries.length}</strong></div>
        </div>
      </div>
    </div>
  );
}
