// src/components/RomanticSwiper.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // ícono de corazón

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./RomanticSwiper.css";

const images = [
  "../../public/carrusel-imgs/foto1.jpeg",
  "../../public/carrusel-imgs/foto2.jpeg",
  "../../public/carrusel-imgs/foto3.jpeg",
  "../../public/carrusel-imgs/foto4.jpeg",
  "../../public/carrusel-imgs/foto5.jpeg",
];

export default function RomanticSwiper() {
  return (
    <div className="romantic-swiper-container scroll-animate fade-right">
      <div className="icon-container">
        <FontAwesomeIcon icon={faHeart} className="heart-icon" />
      </div>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 9000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        className="my-romantic-swiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <img src={src} alt={`Imagen ${index + 1}`} className="slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
