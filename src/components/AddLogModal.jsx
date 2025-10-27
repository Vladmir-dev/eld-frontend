import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddLogModal({ tripId, open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    // trip:tripId,
    date: "",
    pickup_location: "",
    dropoff_location: "",
    total_miles_driven: "",
    total_mileage_today: "",
    trailer_number: "",
    carrier_name: "",
    main_office_address: "",
    home_terminal_address: "",
    manifest_number: "",
    shipper_and_commodity: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };

    // --- FIX: Explicitly convert cycle_used_hours to a number or null ---
    if (dataToSubmit.total_miles_driven !== "") {
      // Convert the string value to a float number
      dataToSubmit.total_miles_driven = Number(dataToSubmit.total_miles_driven);
    } else {
      // If the field is empty, send null for the database
      dataToSubmit.total_miles_driven = null;
    }

    if (dataToSubmit.total_mileage_today !== "") {
      // Convert the string value to a float number
      dataToSubmit.total_mileage_today = Number(dataToSubmit.total_mileage_today);
    } else {
      // If the field is empty, send null for the database
      dataToSubmit.total_mileage_today= null;
    }
    dataToSubmit.trip = tripId
    
    onSubmit(dataToSubmit);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Add Daily Log
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 max-h-[70vh] overflow-y-auto pr-2"
        >
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field.replaceAll("_", " ")}
              </label>
              <input
                type={field === "date" ? "date" : "text"}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          ))}

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-gray-100"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white">
              Save Log
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
