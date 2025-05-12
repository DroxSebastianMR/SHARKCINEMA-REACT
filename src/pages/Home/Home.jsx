import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CarouselBootstrap from "../../components/CarouselBootstrap/CarouselBootstrap";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [cartelera, setCartelera] = useState([]);

  useEffect(() => {
    fetch("https://sharkpluss.com/shark_cinema/data/movies.php")
      .then((res) => res.json())
      .then((data) => {
        setSlides(data.slides || []);
        setCartelera(data.cartelera || []);
      })
      .catch((error) => console.error("Error al cargar películas:", error));
  }, []);

  return (
    <>
      <Navbar />
      <main className="home">
        <CarouselBootstrap slides={slides} />
        <section className="cartelera">
          <div className="cartelera-header">
            <h2>Películas en cartelera</h2>
            <a href="/peliculas" className="ver-mas">Ver más</a>
          </div>
          <div className="cartelera-grid">
            {cartelera.slice(0, 5).map((pelicula, idx) => (
              <div className="movie-card" key={idx}>
                <Link to={`/pelicula/${pelicula.id}`} key={idx} className="movie-card">
                <img src={pelicula.image} alt={pelicula.title} />
                <div className="movie-title">{pelicula.title}</div>
              </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="registro-invitacion">
          <div className="registro-wrapper">
            <img src="/src/assets/socio.png" alt="Tarjeta Socio" className="registro-img" />
            <div className="registro-contenido">
              <div className="registro-texto">
                <h2>Únete a SHARKCINEMA</h2>
                <p>
                  ¿Listo para vivir una experiencia de cine única? Regístrate gratis y
                  empieza a disfrutar de beneficios exclusivos para nuestros socios.
                </p>
                <div className="registro-botones">
                  <Link to="/register" className="btn-rojo">Regístrate</Link>
                  <button className="btn-outline">Ver beneficios</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
