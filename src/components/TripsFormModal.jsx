import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const TripFormModal = ({ onClose, onSubmit }) => {
 const {user, status} = useSelector((state) => state.auth)

 console.log("User", user)

  const [formData, setFormData] = useState({
    user:user?.id,
    pickup_location: "",
    pickup_latitude: "",
    pickup_longitude: "",
    dropoff_location: "",
    dropoff_latitude: "",
    dropoff_longitude: "",
    current_location: "",
    current_cycle_used: "",
    start_date: "",
    // end_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      current_cycle_used:
        formData.current_cycle_used !== ""
          ? parseFloat(formData.current_cycle_used)
          : null,
      pickup_latitude:
        formData.pickup_latitude !== ""
          ? parseFloat(formData.pickup_latitude)
          : null,
      pickup_longitude:
        formData.pickup_longitude !== ""
          ? parseFloat(formData.pickup_longitude)
          : null,
      dropoff_latitude:
        formData.dropoff_latitude !== ""
          ? parseFloat(formData.dropoff_latitude)
          : null,
      dropoff_longitude:
        formData.dropoff_longitude !== ""
          ? parseFloat(formData.dropoff_longitude)
          : null,
    };

    onSubmit(dataToSubmit);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create New Trip
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
              placeholder="e.g. Nairobi, Kenya"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="number"
                step="any"
                name="pickup_latitude"
                value={formData.pickup_latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                step="any"
                name="pickup_longitude"
                value={formData.pickup_longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
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
              placeholder="e.g. Kampala, Uganda"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="number"
                step="any"
                name="dropoff_latitude"
                value={formData.dropoff_latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                step="any"
                name="dropoff_longitude"
                value={formData.dropoff_longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Current Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Location
            </label>
            <input
              type="text"
              name="current_location"
              value={formData.current_location}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cycle Used */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Cycle Used (Hours)
            </label>
            <input
              type="number"
              name="current_cycle_used"
              value={formData.current_cycle_used}
              onChange={handleChange}
              placeholder="e.g. 10"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Start Date */}
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              {status === "loading" ? "Loading..." : "Create Trip"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripFormModal;
