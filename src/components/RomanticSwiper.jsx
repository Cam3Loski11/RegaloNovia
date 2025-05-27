// src/components/RomanticSwiper.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

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
      {/* Decoración de corazones flotantes */}
      <div className="floating-decoration">
        <div className="floating-heart heart-float-1">💕</div>
        <div className="floating-heart heart-float-2">✨</div>
        <div className="floating-heart heart-float-3">💖</div>
        <div className="floating-heart heart-float-4">🌸</div>
      </div>

      {/* Título del carrusel */}
      <div className="carousel-header">
        <FontAwesomeIcon icon={faHeart} className="heart-icon" />
        <h3 className="carousel-title">Tus Momentos</h3>
      </div>

      {/* Swiper mejorado */}
      <div className="swiper-wrapper-enhanced">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, Navigation]}
          effect="fade"
          autoplay={{ 
            delay: 5000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          pagination={{ 
            clickable: true, 
            dynamicBullets: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + ' custom-bullet"><span class="bullet-heart">♥</span></span>';
            }
          }}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={0}
          className="my-romantic-swiper"
          fadeEffect={{
            crossFade: true
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <div className="slide-container">
                <div className="image-frame">
                  <img src={src} alt={`Recuerdo ${index + 1}`} className="slide-image" />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="image-caption">Momento {index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navegación personalizada */}
        <button className="custom-prev swiper-nav-btn">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="custom-next swiper-nav-btn">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* Contador de imágenes */}
      <div className="image-counter">
        <span className="counter-text">Recuerdos especiales</span>
        <div className="counter-hearts">
          {images.map((_, index) => (
            <span key={index} className="counter-heart">💝</span>
          ))}
        </div>
      </div>
    </div>
  );
}