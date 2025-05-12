import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./seleccionAsientos.css";

const filas = "ABCDEFGHIJK".split("");
const columnas = 10;
export default function SeleccionAsientos() {
  const { id, cine, hora } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [butacasOcupadas, setButacasOcupadas] = useState([]);
  const [paso, setPaso] = useState(1);
  const [entradas, setEntradas] = useState({
    general: 0,
    ninos: 0,
    mayores: 0,
    conadis: 0,
  });

  const precios = {
    general: 19,
    ninos: 17,
    mayores: 17,
    conadis: 12.5,
  };

  const [tiempoRestante, setTiempoRestante] = useState(8 * 60);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://sharkpluss.com/shark_cinema/data/movies.php")
      .then((res) => res.json())
      .then((data) => {
        const found = data.cartelera.find((p) => p.id === id);
        setPelicula(found);
      });
  }, [id]);
  useEffect(() => {
    const generarButacasAleatorias = () => {
    const totalButacas = filas.length * columnas;
    const cantidadOcupadas = Math.floor(totalButacas * 0.1); // 10% de butacas ocupadas

    const todas = [];
    filas.forEach((fila) => {
      for (let i = 1; i <= columnas; i++) {
        todas.push(`${fila}${i}`);
      }
    });

    const seleccionadas = new Set();
    while (seleccionadas.size < cantidadOcupadas) {
      const random = todas[Math.floor(Math.random() * todas.length)];
      seleccionadas.add(random);
    }

    setButacasOcupadas([...seleccionadas]);
  };

  generarButacasAleatorias();
}, []);


  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const formatTiempo = () => {
    const minutos = String(Math.floor(tiempoRestante / 60)).padStart(2, "0");
    const segundos = String(tiempoRestante % 60).padStart(2, "0");
    return `${minutos}:${segundos}`;
  };

  const toggleButaca = (codigo) => {
    if (butacasOcupadas.includes(codigo)) return;
    setSeleccionadas((prev) =>
      prev.includes(codigo)
        ? prev.filter((b) => b !== codigo)
        : [...prev, codigo]
    );
  };

  const totalEntradas = Object.values(entradas).reduce((a, b) => a + b, 0);
  const totalPagar = Object.entries(entradas).reduce(
    (acc, [tipo, cantidad]) => acc + cantidad * precios[tipo],
    0
  );

  const continuarCompra = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setMostrarAlerta(true);
      return;
    }
    setPaso(3);
  };

  const finalizarCompra = () => {
    if (!metodoPago || !correo) {
      alert("Por favor, selecciona un método de pago y escribe tu correo.");
      return;
    }

    alert("✅ ¡Compra realizada con éxito!");
    navigate("/");
  };

  return (
    <>
      <div className={`seleccion-container ${mostrarAlerta ? "blurred" : ""}`}>
        <div className="top-bar">
          <button onClick={() => (paso === 1 ? navigate(-1) : setPaso(paso - 1))}>
            ← Atrás
          </button>
          <h2>
            {paso === 1
              ? "1. Selecciona tus butacas"
              : paso === 2
              ? "2. Entradas"
              : "3. Pago"}
          </h2>
          <div className="temporizador">⏱ {formatTiempo()}</div>
        </div>

        <div className="contenido">
          <div className="info-pelicula">
            {pelicula && (
              <>
                <img src={pelicula.image} alt={pelicula.title} className="poster" />
                <h3>{pelicula.title}</h3>
                <p>{pelicula.formatos?.join(", ")}</p>
                <p><strong>{cine}</strong></p>
                <p>📅 Hoy, 11 de Mayo, 2025</p>
                <p>⏰ {hora}</p>
                <p>SALA 2</p>
                <p className="restriccion">🔞 Película con restricción del distribuidor.</p>
                <p><strong>Butacas:</strong> {seleccionadas.join(", ") || "Ninguna"}</p>
              </>
            )}
          </div>

          {paso === 1 && (
            <div className="butacas-box">
              <div className="pantalla">Pantalla</div>
              <div className="butacas-grid">
                {filas.map((fila) => (
                  <div key={fila} className="fila">
                    {Array.from({ length: columnas }, (_, i) => {
                      const codigo = `${fila}${i + 1}`;
                      const ocupada = butacasOcupadas.includes(codigo);
                      const seleccionada = seleccionadas.includes(codigo);
                      return (
                        <div
                          key={codigo}
                          className={`butaca ${ocupada ? "ocupada" : ""} ${seleccionada ? "seleccionada" : ""}`}
                          onClick={() => toggleButaca(codigo)}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="leyenda">
                <span className="circulo disponible"></span> Disponible
                <span className="circulo ocupada"></span> Ocupada
                <span className="circulo seleccionada"></span> Seleccionada
              </div>

              <div className="butacas-seleccionadas">
                Butacas seleccionadas: {seleccionadas.join(", ") || "Ninguna"}
              </div>

              <button
                className="btn-continuar"
                disabled={seleccionadas.length === 0}
                onClick={() => setPaso(2)}
              >
                Continuar
              </button>
            </div>
          )}

          {paso === 2 && (
            <div className="butacas-box">
              <h2>Selecciona tus entradas</h2>
              <p>
                ¡Combínalas como prefieras! Recuerda que deben coincidir con el número de
                butacas seleccionadas.
              </p>

              <div className="entradas-lista">
                {[ 
                  { tipo: "general", label: "General 2D OL", precio: precios.general },
                  { tipo: "ninos", label: "Niños 2D OL", precio: precios.ninos },
                  { tipo: "mayores", label: "Mayores 60 años 2D OL", precio: precios.mayores },
                  { tipo: "conadis", label: "Boleto Conadis 2D OL", precio: precios.conadis },
                ].map(({ tipo, label, precio }) => (
                  <div key={tipo} className="entrada-item">
                    <span>{label} — S/ {precio.toFixed(2)}</span>
                    <div>
                      <button
                        onClick={() =>
                          setEntradas((prev) => ({
                            ...prev,
                            [tipo]: Math.max(prev[tipo] - 1, 0),
                          }))
                        }
                        disabled={entradas[tipo] === 0}
                      >
                        -
                      </button>
                      <span style={{ margin: "0 8px" }}>{entradas[tipo]}</span>
                      <button
                        onClick={() => {
                          if (totalEntradas < seleccionadas.length) {
                            setEntradas((prev) => ({
                              ...prev,
                              [tipo]: prev[tipo] + 1,
                            }));
                          }
                        }}
                        disabled={totalEntradas >= seleccionadas.length}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="butacas-seleccionadas">
                Entradas seleccionadas: {totalEntradas} de {seleccionadas.length}
              </div>

              <div className="total-pago">Total: <strong>S/ {totalPagar.toFixed(2)}</strong></div>

              <button
                className="btn-continuar"
                disabled={totalEntradas !== seleccionadas.length}
                onClick={continuarCompra}
              >
                Continuar compra
              </button>
            </div>
          )}

          {paso === 3 && (
            <div className="butacas-box pago-box">
              <h2>Método de pago</h2>
              <div className="metodos-pago">
                {["Yape", "Plin", "Tarjeta"].map((metodo) => (
                  <button
                    key={metodo}
                    className={`metodo ${metodoPago === metodo ? "seleccionado" : ""}`}
                    onClick={() => setMetodoPago(metodo)}
                  >
                    {metodo}
                  </button>
                ))}
              </div>

              <div className="input-correo">
                <label>Correo de confirmación</label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              <div className="total-pago">Total a pagar: <strong>S/ {totalPagar.toFixed(2)}</strong></div>

              <button className="btn-finalizar" onClick={finalizarCompra}>
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      </div>

      {mostrarAlerta && (
        <div className="modal-overlay">
          <div className="modal-alert">
            <h3>⚠️ Debes iniciar sesión</h3>
            <p>Para continuar con tu compra, inicia sesión en tu cuenta.</p>
            <button onClick={() => navigate("/login")}>Ir a iniciar sesión</button>
          </div>
        </div>
      )}
    </>
  );
}
