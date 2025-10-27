import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const TripUpdateModal = ({ trip, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    pickup_location: "",
    pickup_latitude: "",
    pickup_longitude: "",
    dropoff_location: "",
    dropoff_latitude: "",
    dropoff_longitude: "",
    current_location: "",
    current_cycle_used: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  useEffect(() => {
    if (trip) {
      setFormData({
        pickup_location: trip.pickup_location || "",
        pickup_latitude: trip.pickup_latitude || "",
        pickup_longitude: trip.pickup_longitude || "",
        dropoff_location: trip.dropoff_location || "",
        dropoff_latitude: trip.dropoff_latitude || "",
        dropoff_longitude: trip.dropoff_longitude || "",
        current_location: trip.current_location || "",
        current_cycle_used: trip.current_cycle_used || "",
        start_date: trip.start_date ? trip.start_date.split("T")[0] : "",
        end_date: trip.end_date ? trip.end_date.split("T")[0] : null,
        status: trip.status || "ongoing",
      });
    }
  }, [trip]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTrip = {
      ...formData,
      current_cycle_used: parseFloat(formData.current_cycle_used) || 0,
      pickup_latitude: parseFloat(formData.pickup_latitude) || 0,
      pickup_longitude: parseFloat(formData.pickup_longitude) || 0,
      dropoff_latitude: parseFloat(formData.dropoff_latitude) || 0,
      dropoff_longitude: parseFloat(formData.dropoff_longitude) || 0,
    };
    onSubmit(updatedTrip);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Update Trip #{trip?.id}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pickup Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="number"
                step="any"
                name="pickup_latitude"
                value={formData.pickup_latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                step="any"
                name="pickup_longitude"
                value={formData.pickup_longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Dropoff Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Dropoff Location
            </label>
            <input
              type="text"
              name="dropoff_location"
              value={formData.dropoff_location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="number"
                step="any"
                name="dropoff_latitude"
                value={formData.dropoff_latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                step="any"
                name="dropoff_longitude"
                value={formData.dropoff_longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Other Fields */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Location
            </label>
            <input
              type="text"
              name="current_location"
              value={formData.current_location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Cycle Used (Hours)
            </label>
            <input
              type="number"
              name="current_cycle_used"
              value={formData.current_cycle_used}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button type="submit">
              {loading ? "Updating..." : "Update Trip"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripUpdateModal;
