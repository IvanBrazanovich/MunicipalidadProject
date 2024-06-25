import React, { useEffect, useState } from "react";
import Automovil from "./Automovil";
// import automovilesData from "../data/automoviles.json";

const AutomovilList = ({ setModalState }) => {
  const [automoviles, setAutomoviles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDarDeBaja = async (e, automovil) => {
    const idbien = automovil.idbien;

    const response = await fetch(`http://localhost:5123/api/bien/${idbien}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Bien dado de baja exitosamente");
      // Aquí puedes manejar la actualización del estado de tu aplicación, por ejemplo, removiendo el bien de la lista
    } else {
      console.error("Error al dar de baja el bien");
      // Manejo de errores
    }
  };

  useEffect(() => {
    fetchAutomoviles();
  }, []);

  const fetchAutomoviles = async () => {
    try {
      const response = await fetch(
        "http://localhost:5123/api/bien/automoviles"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAutomoviles(data.$values);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-green-500 mb-4">
        Listado de Automóviles
      </h2>
      <ul>
        {automoviles.map((automovil, index) => (
          <Automovil
            key={index}
            automovil={automovil}
            setModalState={setModalState}
            handleDarDeBaja={handleDarDeBaja}
          />
        ))}
      </ul>
    </div>
  );
};

export default AutomovilList;
