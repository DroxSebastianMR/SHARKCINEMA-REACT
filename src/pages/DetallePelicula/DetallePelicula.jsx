import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import "./detallePelicula.css";

export default function DetallePelicula() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null);
  const [sedesData, setSedesData] = useState([]);

  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [cineSeleccionado, setCineSeleccionado] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  const [ciudades, setCiudades] = useState([]);
  const [cines, setCines] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [funcionesFiltradas, setFuncionesFiltradas] = useState([]);
  const [expandedSede, setExpandedSede] = useState(null);

  useEffect(() => {
    fetch("https://sharkpluss.com/shark_cinema/data/movies.php")
      .then((res) => res.json())
      .then((data) => {
        const found = data.cartelera.find((p) => p.id === id);
        setPelicula(found);
      })
      .catch((error) => console.error("Error al cargar película:", error));
  }, [id]);

  useEffect(() => {
    fetch("https://sharkpluss.com/shark_cinema/data/sedes/data.php")
      .then((res) => res.json())
      .then((data) => {
        setSedesData(data.sedes);
        setCiudades(data.sedes.map((s) => s.ciudad));

        // Mostrar todas las funciones por defecto
        const todasFunciones = [];
        data.sedes.forEach((sede) => {
          sede.cines.forEach((cine) => {
            cine.funciones.forEach((funcion) => {
              todasFunciones.push({
                ciudad: sede.ciudad,
                cine: cine.nombre,
                ...funcion
              });
            });
          });
        });
        setFuncionesFiltradas(todasFunciones);
      })
      .catch((error) => console.error("Error al cargar sedes:", error));
  }, []);

  useEffect(() => {
    if (!ciudadSeleccionada) {
      setCines([]);
      setCineSeleccionado("");
      return;
    }

    const cinesCiudad = sedesData.find((s) => s.ciudad === ciudadSeleccionada)?.cines || [];
    setCines(cinesCiudad.map((c) => c.nombre));
    setCineSeleccionado("");
    setFechaSeleccionada("");
    setFechas([]);
  }, [ciudadSeleccionada]);

  useEffect(() => {
    if (!cineSeleccionado || !ciudadSeleccionada) {
      setFechas([]);
      setFechaSeleccionada("");
      return;
    }

    const cine = sedesData
      .find((s) => s.ciudad === ciudadSeleccionada)
      ?.cines.find((c) => c.nombre === cineSeleccionado);

    const fechasDisponibles = cine?.funciones.map((f) => f.fecha) || [];
    setFechas(fechasDisponibles);
    setFechaSeleccionada("");
  }, [cineSeleccionado]);

  useEffect(() => {
    if (sedesData.length === 0) return;

    const funciones = [];

    sedesData.forEach((sede) => {
      if (ciudadSeleccionada && sede.ciudad !== ciudadSeleccionada) return;

      sede.cines.forEach((cine) => {
        if (cineSeleccionado && cine.nombre !== cineSeleccionado) return;

        cine.funciones.forEach((funcion) => {
          if (fechaSeleccionada && funcion.fecha !== fechaSeleccionada) return;

          funciones.push({
            ciudad: sede.ciudad,
            cine: cine.nombre,
            ...funcion
          });
        });
      });
    });

    setFuncionesFiltradas(funciones);
  }, [ciudadSeleccionada, cineSeleccionado, fechaSeleccionada, sedesData]);

  const toggleSede = (nombre) => {
    setExpandedSede(expandedSede === nombre ? null : nombre);
  };

  if (!pelicula) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className="detalle-container">
        {/* TRAILER */}
        <div className="trailer-section">
          <iframe
            width="100%"
            height="500"
            src={pelicula.trailer}
            title={pelicula.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* TÍTULO + BOTÓN */}
        <div className="info-header">
          <div className="titulo">
            <h1>
              {pelicula.title}{" "}
              <span className="clasificacion">({pelicula.rating})</span>
            </h1>
            <p className="meta">
              {pelicula.genre} | {pelicula.duration} | {pelicula.rating}
            </p>
          </div>
          <button className="btn-comprar">Comprar</button>
        </div>

        {/* SINOPSIS Y POSTER */}
        <div className="detalle-body">
          <div className="poster-box">
            <img src={pelicula.image} alt={pelicula.title} />
          </div>
          <div className="sinopsis-box">
            <h2>Sinopsis</h2>
            <p>{pelicula.sinopsis}</p>
            <div className="extra-info">
              <p>
                <strong>Director:</strong> {pelicula.director}
              </p>
              <p>
                <strong>Idioma:</strong>{" "}
                {pelicula.idioma?.map((i, idx) => (
                  <span key={idx} className="idioma">{i}</span>
                ))}
              </p>
              <p>
                <strong>Disponible:</strong> {pelicula.disponible?.join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* FUNCIONES */}
        <div className="funciones-container">
          <h2>La función perfecta para ti.</h2>

          <div className="filtros-funciones">
            <select value={ciudadSeleccionada} onChange={(e) => setCiudadSeleccionada(e.target.value)}>
              <option value="">Por ciudad</option>
              {ciudades.map((ciudad, i) => (
                <option key={i} value={ciudad}>{ciudad}</option>
              ))}
            </select>

            <select value={cineSeleccionado} onChange={(e) => setCineSeleccionado(e.target.value)} disabled={!ciudadSeleccionada}>
              <option value="">Por cine</option>
              {cines.map((cine, i) => (
                <option key={i} value={cine}>{cine}</option>
              ))}
            </select>

            <select value={fechaSeleccionada} onChange={(e) => setFechaSeleccionada(e.target.value)} disabled={!cineSeleccionado}>
              <option value="">Por fecha</option>
              {fechas.map((fecha, i) => (
                <option key={i} value={fecha}>{fecha}</option>
              ))}
            </select>
          </div>

          {/* FUNCIONES FILTRADAS */}
          <div className="sedes-lista">
            {funcionesFiltradas.map((funcion, index) => (
              <div key={index} className="sede-item">
                <div
                  className="sede-nombre"
                  onClick={() => toggleSede(funcion.cine)}
                >
                  {funcion.cine} ({funcion.ciudad})
                  <span className="toggle-icon">
                    {expandedSede === funcion.cine ? "−" : "+"}
                  </span>
                </div>

                {expandedSede === funcion.cine && (
                  <div className="sede-detalle">
                    <div className="formato">
                      {funcion.formatos.map((formato, i) => (
                        <span key={i} className="formato-tag">{formato}</span>
                      ))}
                    </div>
                    <div className="horarios">
                      {funcion.horarios.map((hora, i) => (
                        <button
                          key={i}
                          className="horario-btn"
                          onClick={() =>
                            navigate(
                              `/asientos/${id}/${encodeURIComponent(funcion.cine)}/${hora}`
                            )
                          }
                        >
                          {hora}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
