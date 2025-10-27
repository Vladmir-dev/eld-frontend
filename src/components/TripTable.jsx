// src/components/TripTable.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2, ChevronRight } from "lucide-react";
import TripsUpdateModal from "./TripsUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { updateTrip } from "../features/trips/tripSlice";

export default function TripTable({ trips = [] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTrip, setSelectedTrip] = useState(null);
//   const { user } = useSelector((state) => state.auth);
const { status } = useSelector((state) => state.trips);

const handleUpdate = (data) => {
    console.log("Update data:", data);
  dispatch(updateTrip({ id: selectedTrip.id, payload:data}))
    .unwrap()
    .then(() => setSelectedTrip(null))
    .catch((err) => console.error(err));
};

console.log("Selected Trip:", selectedTrip);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th className="py-2">ID</th>
            <th>Pickup</th>
            <th>Dropoff</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th className="text-center">Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trips.length === 0 && (
            <tr>
              <td colSpan="7" className="py-6 text-center text-gray-500">
                No trips found.
              </td>
            </tr>
          )}
          {trips.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="py-3">{t.id}</td>
              <td>{t.pickup_location}</td>
              <td>{t.dropoff_location}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    t.status === "ongoing"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {t.status}
                </span>
              </td>
              <td>
                {t.start_date ? new Date(t.start_date).toLocaleString() : "-"}
              </td>
              <td>
                {t.end_date ? new Date(t.end_date).toLocaleString() : "-"}
              </td>
              {/* <td className="text-right">
                <button onClick={() => navigate(`/trips/${t.id}/logs`)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">View Logs</button>
              </td> */}
              <td className="py-3 text-center flex justify-center items-center gap-2">
                {/* View Logs Button (Existing Action) */}
                <button
                  onClick={() => navigate(`/trips/${t.id}/logs`)}
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-150"
                  title="View Logs"
                >
                  Logs <ChevronRight className="w-4 h-4 ml-1" />
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => setSelectedTrip(t)}
                  className="p-1 text-gray-500 hover:text-yellow-600 transition duration-150 rounded-full hover:bg-gray-100"
                  title="Edit Trip"
                >
                  <Edit className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => console.log(t.id)}
                  className="p-1 text-red-400 hover:text-red-600 transition duration-150 rounded-full hover:bg-gray-100"
                  title="Delete Trip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {selectedTrip && (
                  <TripsUpdateModal
                    trip={selectedTrip}
                    onClose={() => setSelectedTrip(null)}
                    onSubmit={handleUpdate}
                    loading={status === "updating"}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
