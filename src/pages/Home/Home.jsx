import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CarouselBootstrap from "../../components/CarouselBootstrap/CarouselBootstrap";
import { moviesData } from "../../data/movies/movies.data";

export default function Home() {
  const { slides, cartelera } = moviesData;

  return (
    <>
      <Navbar />
      <main className="home">
        <CarouselBootstrap slides={slides} />
        <section className="cartelera">
          <div className="cartelera-header">
            <h2>Películas en cartelera</h2>
            <Link to="/peliculas" className="ver-mas">Ver más</Link>
          </div>

          <div className="cartelera-grid">
            {cartelera.slice(0, 5).map((pelicula) => (
              <Link
                to={`/pelicula/${pelicula.id}`}
                className="movie-card"
                key={pelicula.id}
              >
                <img src={pelicula.image} alt={pelicula.title} />
                <div className="movie-title">{pelicula.title}</div>
              </Link>
            ))}
          </div>
        </section>
        <section className="registro-invitacion">
          <div className="registro-wrapper">
            <img src="/src/assets/socio.png" alt="Tarjeta Socio" className="registro-img" />
            <div className="registro-contenido">
              <h2>Únete a SHARKCINEMA</h2>
              <p>
                Regístrate gratis y disfruta beneficios exclusivos para socios.
              </p>
              <div className="registro-botones">
                <Link to="/register" className="btn-rojo">Regístrate</Link>
                <button className="btn-outline">Ver beneficios</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
