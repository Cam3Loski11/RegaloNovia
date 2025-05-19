import React, { useState } from "react";
import "./BirthdayMessage.css";

export default function BirthdayMessage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className={`card ${isOpen ? "open" : ""}`}>
        <div className="card-front">
          <h2>Para mi amorcito 💌</h2>
          <p>Haz clic aquí para abrir tu cartita...</p>
        </div>
        <div className="card-inside">
          <h3>¡Feliz cumpleaños, mi vida! 🎉</h3>
          <p>
            Hoy es un día muy especial porque celebramos tu vida. Gracias por
            iluminar mis días con tu sonrisa, tu amor y tu ternura. Estoy tan
            feliz de tenerte en mi vida. Te mereces todo lo hermoso que este
            mundo tiene para ofrecerte. Espero que esta pequeña sorpresa te
            saque una sonrisa, como tú me las sacas a mí todos los días.
          </p>
          <p>Te amo con todo mi corazón ❤️</p>
        </div>
      </div>
    </div>
  );
}
