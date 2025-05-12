import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <h4>Nosotros</h4>
          <p>Conócenos</p>
          <p>Trabaja con nosotros</p>
        </div>
        <div>
          <h4>Atención al cliente</h4>
          <p>Contáctanos</p>
          <p>Preguntas frecuentes</p>
        </div>
        <div>
          <h4>Políticas</h4>
          <p>Privacidad</p>
          <p>Condiciones de uso</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Shark Cinema. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
