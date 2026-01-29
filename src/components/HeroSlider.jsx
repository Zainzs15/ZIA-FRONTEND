import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

import slide1 from "../assets/slider/slide1.jpeg";
import slide2 from "../assets/slider/slide2.png";
import slide3 from "../assets/slider/slide3.png";
import slide4 from "../assets/slider/slide4.png";

export default function HeroSlider() {
  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="hero-swiper"
      >
        {[slide1, slide2, slide3, slide4].map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="overlay">
                <h1 data-aos="fade-down">
                  Natural & Permanent Healing
                </h1>

                <p data-aos="fade-up" data-aos-delay="200">
                  ZIA Homeopathic Clinic provides safe, natural and
                  personalized treatment to cure diseases from the root —
                  without side effects.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-cta">
        <Link to="/login">
          <button className="gold-btn">Book Appointment</button>
        </Link>
      </div>
    </section>
  );
}
