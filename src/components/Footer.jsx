export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>ZIA Homeopathic Clinic</h3>
          <p>Natural, gentle and personalized care for your family.</p>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Phone: 0333-2081853</p>
          <p>Clinic Timings: 7 PM – 10 PM</p>
        </div>

        <div className="footer-social">
          <h4>Connect</h4>
          <div className="footer-social-row">
            <span className="social-pill">WhatsApp</span>
            <span className="social-pill">Facebook</span>
            <span className="social-pill">Instagram</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ZIA Homeopathic Clinic. All Rights Reserved.</p>
      </div>
    </footer>
  );
}