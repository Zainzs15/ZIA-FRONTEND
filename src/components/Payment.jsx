import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PLAN_PRICES = {
  basic: 600,
  premium: 1000,
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const plan = location.state?.plan || "basic";
  const amount = PLAN_PRICES[plan] || PLAN_PRICES.basic;

  const [method, setMethod] = useState("jazzcash");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !phone) {
      setError("Please enter name and phone.");
      return;
    }

    setLoading(true);
    navigate("/confirm-payment", {
      state: { name, phone, plan, method, amount },
    });
  };

  return (
    <section className="page payment-page">
      <h1>Payment</h1>

      <p>
        You selected the <strong>{plan === "basic" ? "Basic Access" : "Premium Care"}</strong>{" "}
        plan.
      </p>

      <div className="payment-box">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>PKR {amount}</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>PKR {amount}</span>
        </div>

        <form onSubmit={handleContinue} className="payment-form">
          <h3>Patient Details</h3>

          <div className="login-field">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <h3>Payment Method</h3>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="jazzcash"
              checked={method === "jazzcash"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="jazzcash-logo-badge">
                <span className="jazzcash-logo-text">JazzCash</span>
              </div>
              <span>Pay via JazzCash (to clinic wallet)</span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="sadapay"
              checked={method === "sadapay"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="pay-logo pay-logo-sadapay">SadaPay</div>
              <span>SadaPay – card / wallet transfer</span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="nayapay"
              checked={method === "nayapay"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="pay-logo pay-logo-nayapay">NayaPay</div>
              <span>NayaPay – wallet transfer</span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="credit"
              checked={method === "credit"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="pay-logo pay-logo-card">Credit Card</div>
              <span>Pay with credit card</span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="debit"
              checked={method === "debit"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="pay-logo pay-logo-card">Debit Card</div>
              <span>Pay with debit card</span>
            </div>
          </label>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>

        {message && <p className="payment-note" style={{ color: "green" }}>{message}</p>}
        {error && <p className="payment-note" style={{ color: "red" }}>{error}</p>}
      </div>
    </section>
  );
};

export default Payment;

