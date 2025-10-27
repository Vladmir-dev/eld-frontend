import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips, createTrip } from "../features/trips/tripSlice";
import TripTable from "../components/TripTable";
import TripFormModal from "../components/TripsFormModal";
import { Button } from "@/components/ui/button";

const TripsPage = () => {
  const dispatch = useDispatch();

  const { items: trips, status, error } = useSelector((state) => state.trips);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const handleCreateTrip = async (formData) => {
    await dispatch(createTrip(formData));
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Trips</h1>
        <Button onClick={() => setShowModal(true)}>+ New Trip</Button>
      </div>

      {status === "loading" && <p className="text-gray-600">Loading trips...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      {trips.length > 0 ? (
        <TripTable trips={trips} />
      ) : (
        <p className="text-gray-500 italic">No trips available yet.</p>
      )}

      {showModal && (
        <TripFormModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateTrip}
        />
      )}
    </div>
  );
};

export default TripsPage;
