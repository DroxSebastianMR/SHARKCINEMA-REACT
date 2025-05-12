import React, { useEffect, useState } from "react";
import "./perfil.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  if (!user) return null;

  return (
    <div className="perfil-fullpage">
      <button className="btn-volver" onClick={handleBack}>← Atrás</button>

      <div className="perfil-card">
        <FaUserCircle className="perfil-icon" />
        <h2>{user.nombre}</h2>
        <p><strong>DNI:</strong> {user.dni}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <button className="btn-cerrar-sesion" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
