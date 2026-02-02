import { useState } from "react";

import { API_BASE } from "../config.js";

export default function AppointmentPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [concern, setConcern] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!name || !phone) {
      setError("Name and phone are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          preferredDate: date || new Date().toISOString().slice(0, 10),
          concern,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to book");
      setMessage(`Booked! Your patient number is ${data.data?.patientNumber}.`);
      setName("");
      setPhone("");
      setDate("");
      setConcern("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>Book an Appointment</h1>
      <p>
        Your health deserves time and attention. Book an appointment today
        and start your journey towards natural healing.
      </p>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Health Concern"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
        />
        <button disabled={loading}>{loading ? "Booking..." : "Take Appointment"}</button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </section>
  );
}
