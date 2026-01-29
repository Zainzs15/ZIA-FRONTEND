import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <nav className="navbar">
      <h2 className="logo">ZIA Homeopathic Clinic</h2>

      <div className="menu-toggle" onClick={handleToggle}>
        ☰
      </div>

      <ul className={open ? "active" : ""}>
        <li onClick={handleClose}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={handleClose}>
          <Link to="/education">Education</Link>
        </li>
        <li onClick={handleClose}>
          <Link to="/appointment">Appointment</Link>
        </li>
        <li onClick={handleClose}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}