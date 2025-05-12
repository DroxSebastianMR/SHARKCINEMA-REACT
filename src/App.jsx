import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"; // Asegúrate de importar
import Perfil from "./pages/Perfil/Perfil";
import Peliculas from "./pages/Peliculas/Peliculas";
import DetallePelicula from "./pages/DetallePelicula/DetallePelicula";
import SeleccionAsientos from "./pages/SeleccionAsientos/SeleccionAsientos";
import Proximos from "./pages/Proximos/Proximos"; // NUEVO
import NotFoundRedirect from "./pages/NotFound/NotFoundRedirect"; 
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/peliculas" element={<Peliculas />} />
      <Route path="/pelicula/:id" element={<DetallePelicula />} />
      <Route path="/asientos/:id/:cine/:hora" element={<SeleccionAsientos />} />
      <Route path="/proximos" element={<Proximos />} />
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  );
}
