import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { API_BASE } from "../config.js";
const JAZZCASH_NUMBER = "0305-2654324";

const ConfirmPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, phone, plan, method, amount } = location.state || {};

  // Redirect if user landed here without payment details (e.g. refresh or direct URL)
  const hasPaymentState = location.state?.plan != null || location.state?.amount != null;
  useEffect(() => {
    if (!hasPaymentState) {
      navigate("/plans", { replace: true });
    }
  }, [hasPaymentState, navigate]);

  const [txnId, setTxnId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleConfirm = async (e) => {
  e.preventDefault();
  setError("");

  // basic validation
  if (!name || !phone || !plan || !method || !amount) {
    setError("Missing payment details. Please start again from plan selection.");
    return;
  }

  setLoading(true);
  try {
    const payload = {
      name,
      phone,
      plan,
      preferredDate: new Date().toISOString().slice(0, 10),
      concern: "",
      method,
      amount,
      txnId,
    };
    const apptRes = await fetch(`${API_BASE}/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = apptRes.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const apptJson = isJson ? await apptRes.json().catch(() => null) : null;

    if (!apptRes.ok) {
      const msg = apptJson?.error || `Request failed (${apptRes.status})`;
      throw new Error(msg);
    }

    if (!apptJson?.data) {
      throw new Error("Invalid response from server");
    }

    const appt = apptJson.data;

    // format slot time
    const slotStart = new Date(appt.slotStart).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const slotEnd = new Date(appt.slotEnd).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    navigate("/share-payment", {
      state: {
        name,
        phone,
        plan,
        method,
        amount,
        patientNumber: appt.patientNumber,
        slotStart,
        slotEnd,
      },
    });
  } catch (err) {
    console.error("ConfirmPayment error:", err);
    const message =
      err.message ||
      (err.name === "TypeError" && err.message.includes("fetch")
        ? "Network error. Check your connection and try again."
        : "Something went wrong while booking your appointment.");
    setError(message);
  } finally {
    setLoading(false);
  }
};

  if (!hasPaymentState) {
    return (
      <section className="page payment-page">
        <p>Redirecting to plans...</p>
      </section>
    );
  }

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
            {loading ? "Verifying..." : "Book my appointment"}
          </button>
        </form>
        {error && <p className="payment-note" style={{ color: "red" }}>{error}</p>}

        <p className="payment-note">
          
        </p>
      </div>
    </section>
  );
};

export default ConfirmPayment;

