import React, { useEffect, useState } from "react";
import "./proximos.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

export default function Proximos() {
  const [proximas, setProximas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const peliculasPorPagina = 15;

  useEffect(() => {
    fetch("https://sharkpluss.com/shark_cinema/data/proximos.php")
      .then((res) => res.json())
      .then((data) => {
        setProximas(data.proximos || []);
      })
      .catch((error) => console.error("Error al cargar próximos estrenos:", error));
  }, []);

  const totalPaginas = Math.ceil(proximas.length / peliculasPorPagina);
  const indiceInicio = (paginaActual - 1) * peliculasPorPagina;
  const visibles = proximas.slice(indiceInicio, indiceInicio + peliculasPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <>
      <Navbar />
      <div className="peliculas-page">
        <h1 className="titulo-seccion">Próximos Estrenos</h1>
        <div className="peliculas-container fade-in">
          {visibles.map((peli, index) => (
            <div className="pelicula-card" key={index}>
              <div className="pelicula-img-wrapper">
                <img src={peli.image} alt={peli.title} />
                <div className="overlay">
                  <Link to={`/pelicula/${peli.id}`}>
                    <button className="btn detalles">+ Ver Detalles</button>
                  </Link>
                </div>
              </div>
              <h3 className="titulo">{peli.title}</h3>
              <p className="info">{peli.genre}, {peli.duration}, {peli.clasificacion}</p>
            </div>
          ))}
        </div>

        <div className="paginacion">
          <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>⬅</button>
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              className={paginaActual === i + 1 ? "activo" : ""}
              onClick={() => cambiarPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>➡</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
