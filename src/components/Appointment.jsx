export default function Appointment() {
return (
<section className="education" id="education">
  <h2 data-aos="fade-down">Education & Medical Background</h2>

  <div className="edu-grid">

    <div className="edu-card" data-aos="fade-up">
      <span className="edu-dot"></span>
      <h3>Matriculation</h3>
      <p>
        Completed secondary education with a strong academic base,
        focusing on science subjects and discipline.
      </p>
    </div>

    <div className="edu-card" data-aos="fade-up" data-aos-delay="150">
      <span className="edu-dot"></span>
      <h3>Intermediate (Pre-Medical)</h3>
      <p>
        Studied Biology, Chemistry and Physics, building a foundation
        for medical and health sciences.
      </p>
    </div>

    <div className="edu-card" data-aos="fade-up" data-aos-delay="300">
      <span className="edu-dot"></span>
      <h3>Medical Education</h3>
      <p>
        Continued professional medical learning with focus on patient
        care, clinical exposure and ethical practice.
      </p>
    </div>

  </div>
</section>

);
}