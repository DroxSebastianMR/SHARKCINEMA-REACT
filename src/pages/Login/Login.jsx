import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [dniCorreo, setDniCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("https://sharkpluss.com/shark_cinema/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dniCorreo, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(from); // Volver a la página anterior
    } else {
      alert("Credenciales inválidas. Intenta de nuevo.");
    }
  };

  return (
    <>
      <div className="login-header">
        <button className="btn-atras" onClick={() => navigate(-1)}>
          ← Atrás
        </button>
      </div>

      <main className="login-container">
        <div className="login-card">
          <h2>Iniciar sesión</h2>
          <p>Ingresa a tu cuenta para disfrutar de beneficios y acumular puntos.</p>

          <input
            type="text"
            placeholder="DNI o Correo"
            className="login-input"
            value={dniCorreo}
            onChange={(e) => setDniCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="#" className="forgot-password">¿Olvidaste tu contraseña?</Link>

          <button className="btn-ingresar" onClick={handleLogin}>
            Ingresar
          </button>
        </div>

        <div className="login-bottom">
          <p><strong>¿No eres socio?</strong></p>
          <p>Regístrate y empieza a acumular puntos y disfrutar beneficios.</p>
          <Link to="/register" className="btn-unete">Únete</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
