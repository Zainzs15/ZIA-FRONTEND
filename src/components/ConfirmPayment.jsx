import { useLocation } from "react-router-dom";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const JAZZCASH_NUMBER = "0305-2654324";

const ConfirmPayment = () => {
  const location = useLocation();
  const { name, phone, plan, method, amount } = location.state || {};

  const [txnId, setTxnId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [patientNumber, setPatientNumber] = useState(null);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!name || !phone || !plan || !method || !amount) {
      setError("Missing payment details. Please start again from plan selection.");
      return;
    }

    setLoading(true);
    try {
      // Create appointment slot (payment itself was done manually by patient)
      const apptRes = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, plan }),
      });

      if (!apptRes.ok) {
        const j = await apptRes.json().catch(() => null);
        throw new Error(j?.error || "Failed to create appointment");
      }

      const apptJson = await apptRes.json();
      const appt = apptJson.data;

      const slotStart = new Date(appt.slotStart).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const slotEnd = new Date(appt.slotEnd).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setPatientNumber(appt.patientNumber);
      setMessage(
        `Your patient number is ${appt.patientNumber} for slot ${slotStart} – ${slotEnd}.`
      );
    } catch (err) {
      setError(err.message || "Something went wrong while booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page payment-page">
      <h1>Payment Instructions</h1>

      <p>
        Please <strong>first send PKR {amount}</strong> to the clinic JazzCash number below.
      </p>

      <div className="payment-box">
        <div className="summary-row">
          <span>Plan</span>
          <span>{plan === "basic" ? "Basic Access" : "Premium Care"}</span>
        </div>
        <div className="summary-row">
          <span>Amount</span>
          <span>PKR {amount}</span>
        </div>
        <div className="summary-row total">
          <span>JazzCash Number</span>
          <span>{JAZZCASH_NUMBER}</span>
        </div>

        <form onSubmit={handleConfirm} className="payment-form">
          <div className="login-field">
            <label>Full Name</label>
            <input type="text" value={name || ""} disabled />
          </div>

          <div className="login-field">
            <label>Phone</label>
            <input type="tel" value={phone || ""} disabled />
          </div>

          <div className="login-field">
            <label>JazzCash Transaction ID (optional)</label>
            <input
              type="text"
              placeholder="Eg: 1234ABC"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Verifying..." : "I have paid – Book my appointment"}
          </button>
        </form>

        {message && (
          <>
            <p className="payment-note" style={{ color: "green" }}>
              {message}
            </p>
            <p className="payment-note">
              Now share your <strong>payment screenshot</strong> along with your{" "}
              <strong>name</strong>, <strong>phone number</strong> and{" "}
              <strong>patient number</strong> with the clinic so your booking is fully
              confirmed.
            </p>
            <a
              href={`https://wa.me/923332081853?text=${encodeURIComponent(
                `Salam, my name is ${name || ""}.\nPatient number: ${
                  patientNumber || ""
                }\nPhone: ${phone || ""}\nI am sharing my payment screenshot for confirmation.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="gold-btn"
              style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
            >
              Open WhatsApp with my details
            </a>
          </>
        )}
        {error && <p className="payment-note" style={{ color: "red" }}>{error}</p>}

        <p className="payment-note">
          
        </p>
      </div>
    </section>
  );
};

export default ConfirmPayment;

