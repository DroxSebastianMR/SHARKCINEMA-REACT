import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-section left">
        <Link to="/">
          <img src={logo} alt="Shark Cinema" className="logo" />
        </Link>
      </div>

      <div className="navbar-section center">
        <Link to="/peliculas">Películas</Link>
        <Link to="/proximos">Próximos Estrenos</Link>
        <Link to="/dulceria">Dulcería</Link>
      </div>

      <div className="navbar-section right">
        {user ? (
          <Link to="/perfil" className="user-info">
            <FaUserCircle className="user-icon" />
            <span className="user-name">Hola, {user.nombre}</span>
          </Link>
        ) : (
          <Link to="/login" state={{ from: location.pathname }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
