import { useState } from "react";
import "../index.css";

const DoctorProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="doctor-wrapper">
      <div className="doctor-card">
        <div className="doctor-image">
          {image ? (
            <img src={image} alt="Dr. Farzana" />
          ) : (
            <div className="upload-box">
           <img src="./fajjo.jpeg" alt="" />
            </div>
          )}
        </div>

        <div className="doctor-info">
          <h1>Dr. Farzana</h1>
          <h3>Homeopathic Specialist</h3>

          <p>
            Dr. Farzana is a dedicated and compassionate homeopathic physician,
            known for her patient-centered approach and commitment to natural
            healing. Her expertise and care reflect the trusted values of
            Zia Homeopathic Clinic.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
