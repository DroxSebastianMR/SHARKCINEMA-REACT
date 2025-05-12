// src/pages/NotFoundRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null; // No muestra nada, solo redirige
}
