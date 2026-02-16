import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JAZZCASH_NUMBER = "0305-2654324";

const SharePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, phone, patientNumber, amount, plan, slotStart, slotEnd } =
    location.state || {};

  useEffect(() => {
    if (!patientNumber) {
      navigate("/plans", { replace: true });
    }
  }, [patientNumber, navigate]);

  if (!patientNumber) {
    return (
      <section className="page payment-page">
        <p>Redirecting...</p>
      </section>
    );
  }

  const whatsappText = `Salam, my name is ${name || ""}.
Patient number: ${patientNumber}
Phone: ${phone || ""}
I am sharing my payment screenshot for confirmation.`;

  return (
    <section className="page payment-page">
      <h1>Final Step</h1>

      <p>
        Please send payment of <strong>PKR {amount}</strong> to this JazzCash
        number (also shown below) and then{" "}
        <strong>share your payment screenshot</strong> along with your{" "}
        <strong>patient number</strong> on WhatsApp.
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

        <p className="payment-note">
          Your patient number is{" "}
          <strong style={{ fontSize: "1rem" }}>{patientNumber}</strong>. Please
          mention this number when you send your screenshot.
        </p>
        {slotStart && slotEnd && (
          <p className="payment-note">
            Your tentative slot is from <strong>{slotStart}</strong> to{" "}
            <strong>{slotEnd}</strong>.
          </p>
        )}

        <a
          href={`https://wa.me/923332081853?text=${encodeURIComponent(
            whatsappText
          )}`}
          target="_blank"
          rel="noreferrer"
          className="gold-btn whatsapp-cta"
        >
          Open WhatsApp & send screenshot
        </a>
      </div>
    </section>
  );
};

export default SharePayment;

