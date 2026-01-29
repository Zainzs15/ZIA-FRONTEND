// import doctor from "../assets/images/doctor/doctor.jpg";


export default function DoctorSection() {
return (
<section className="doctor" data-aos="fade-up">
<div className="doctor-content">
<img src={doctor} alt="Doctor" />
<div>
<h2>Dr. Farzana khursheed (DHMS)</h2>
<p>
Experienced Homeopathic Specialist providing safe and natural
treatment for all age groups. Dedicated to patient care and
long-term healing.
</p>
<ul>
<li>✔ 10+ Years Experience</li>
<li>✔ Certified Homeopathic Doctor</li>
<li>✔ Trusted by Hundreds of Patients</li>
</ul>
</div>
</div>
</section>
);
}