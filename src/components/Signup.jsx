import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    navigate("/plans");
  };

  return (
    <div className="login-shell">
      <div className="login-panel">
        <h1 className="login-logo">REGISTRATION</h1>
        <p className="subtitle">Secure access, simplified</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Full Name</label>
          </div>

          <div className="login-field">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Phone Number</label>
          </div>

          <button type="submit" className="btn-primary">
            Continue
          </button>

          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate("/plans")}
          >
            View Plans
          </button>

          <span className="footnote">
            By continuing, you agree to our terms & privacy policy
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
