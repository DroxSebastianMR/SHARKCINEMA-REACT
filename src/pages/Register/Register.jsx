import React, { useState } from "react";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!nombre || !dni || !correo || !password) {
      alert("Completa todos los campos.");
      return;
    }

    const response = await fetch("https://sharkpluss.com/shark_cinema/api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, dni, correo, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("✅ Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } else {
      alert(data.message || "Error al registrar usuario.");
    }
  };

  return (
    <>
      <div className="login-header">
        <button className="btn-atras" onClick={() => navigate(-1)}>← Atrás</button>
      </div>

      <main className="login-container">
        <div className="login-card">
          <h2>Registro</h2>
          <p>Crea una cuenta para acumular puntos y disfrutar beneficios.</p>

          <input
            type="text"
            placeholder="Nombre completo"
            className="login-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="DNI"
            className="login-input"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            className="login-input"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-ingresar" onClick={handleRegister}>
            Registrarme
          </button>
        </div>

        <div className="login-bottom">
          <p><strong>¿Ya tienes cuenta?</strong></p>
          <p>Inicia sesión con tu DNI o correo y contraseña.</p>
          <button className="btn-unete" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
