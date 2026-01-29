export default function Appointment() {
  return (
    <section className="page">
      <h1>Book an Appointment</h1>

      <p>
        Your health deserves time and attention. Book an appointment today
        and start your journey towards natural healing.
      </p>

      <form className="appointment-form">
        <input type="text" placeholder="Full Name" />
        <input type="tel" placeholder="Phone Number" />
        <input type="date" />
        <textarea placeholder="Health Concern"></textarea>
        <button>Take Appointment</button>
      </form>
    </section>
  );
}
