import React, { useEffect, useState } from "react";
import "./peliculas.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

export default function Peliculas() {
  const [cartelera, setCartelera] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const peliculasPorPagina = 15;

  useEffect(() => {
    fetch("https://sharkpluss.com/shark_cinema/data/movies.php")
      .then((res) => res.json())
      .then((data) => {
        setCartelera(data.cartelera || []);
      })
      .catch((error) => console.error("Error al cargar películas:", error));
  }, []);

  const totalPaginas = Math.ceil(cartelera.length / peliculasPorPagina);
  const indiceInicio = (paginaActual - 1) * peliculasPorPagina;
  const peliculasVisibles = cartelera.slice(indiceInicio, indiceInicio + peliculasPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <>
      <Navbar />
      <div className="peliculas-page">
        <h1 className="titulo-seccion">Películas en Cartelera</h1>
        <div className="peliculas-container fade-in">
          {peliculasVisibles.map((peli, index) => (
            <div className="pelicula-card" key={index}>
              <div className="pelicula-img-wrapper">
                <img src={peli.image} alt={peli.title} />
                <div className="overlay">
                  <button className="btn comprar">🎟 Comprar</button>
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
          <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
            ⬅
          </button>
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              className={paginaActual === i + 1 ? "activo" : ""}
              onClick={() => cambiarPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
            ➡
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
