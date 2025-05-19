// src/components/BirthdayMessage.jsx
import React from "react";
import "./BirthdayMessage.css";

export default function BirthdayMessage() {
  return (
    <div className="birthday-card">
      <div className="card-decor top-decor">🌸🌷💖</div>
      <div className="card-message">
        <h2>Feliz cumpleaños, mi amor 💕</h2>
        <p>
          Hoy celebramos algo más que un año más en tu vida. Celebramos tu sonrisa, tu ternura, tu corazón inmenso y todo lo que eres. Eres la persona más especial que he conocido, y cada día a tu lado se siente como un regalo que no merezco.
        </p>
        <p>
          Gracias por tu paciencia, por tu amor, por tu luz. Deseo que este día te haga sentir tan amada como me haces sentir a mí todos los días. Que rías mucho, que sueñes más, y que nunca te falte amor, porque yo te daré el mío siempre.
        </p>
        <p>
          Feliz cumpleaños, princesa. 💗 Te amo con todo mi corazón.
        </p>
      </div>
      <div className="card-decor bottom-decor">💖🌸🌷</div>
    </div>
  );
}
