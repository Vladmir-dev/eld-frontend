// src/components/EntryFormModal.jsx
import React, { useState } from "react";
import api from "../services/api";

const ACTIVITY_OPTIONS = [
  { value: "off_duty", label: "Off Duty" },
  { value: "sleeper", label: "Sleeper (Berth)" },
  { value: "driving", label: "Driving" },
  { value: "on_duty", label: "On Duty (Not Driving)" },
];

export default function EntryFormModal({ open, onClose, log, onCreated }) {
  const [form, setForm] = useState({
    activity_type: "driving",
    start_hour: 0,
    end_hour: 1,
    latitude: "",
    longitude: "",
    location_name: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        daily_log: log.id,
        activity_type: form.activity_type,
        start_hour: parseInt(form.start_hour, 10),
        end_hour: parseInt(form.end_hour, 10),
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        location_name: form.location_name,
        notes: form.notes,
      };
      const res = await api.post("entries/", payload);
      onCreated && onCreated(res.data);
      onClose && onClose();
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillCoords = async () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({
        ...form,
        latitude: pos.coords.latitude.toFixed(6),
        longitude: pos.coords.longitude.toFixed(6),
        location_name: `Coord: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`,
      });
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Add Log Entry</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select name="activity_type" value={form.activity_type} onChange={handleChange} className="w-full p-2 border rounded">
            {ACTIVITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input name="start_hour" value={form.start_hour} onChange={handleChange} type="number" min="0" max="23" className="p-2 border rounded" />
            <input name="end_hour" value={form.end_hour} onChange={handleChange} type="number" min="1" max="24" className="p-2 border rounded" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude" className="p-2 border rounded" />
            <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude" className="p-2 border rounded" />
            <button type="button" onClick={fillCoords} className="px-3 py-2 bg-gray-100 rounded">Use my location</button>
          </div>
          <input name="location_name" value={form.location_name} onChange={handleChange} placeholder="Location name (optional)" className="w-full p-2 border rounded" />
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full p-2 border rounded" />
          {error && <div className="text-red-600">{JSON.stringify(error)}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? "Saving..." : "Save Entry"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
