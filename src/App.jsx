import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Appointment from "./components/Appointment";
import Footer from "./components/Footer";
import Login from "./components/Signup";
import Education from "./components/Education";
import Contact from "./components/Contact";
import AppointmentPage from "./components/Apointment";
import PlanSelect from "./components/PlanSelect";
import Payment from "./components/Payment";
import ConfirmPayment from "./components/ConfirmPayment";

// ✅ NEW IMPORT (nothing else touched)
import DoctorProfile from "./components/DoctorProfile";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSlider />

                {/* ✅ Doctor section added AFTER Hero */}
                <DoctorProfile />

                <Appointment />
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/plans" element={<PlanSelect />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm-payment" element={<ConfirmPayment />} />
          <Route path="/education" element={<Education />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
