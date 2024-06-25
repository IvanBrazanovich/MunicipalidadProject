import React, { useEffect, useState } from "react";
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
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Listado de Automóviles</h2>
      <ul>
        {automoviles.map((automovil, index) => {
          return (
            <li key={index} className="border p-4 mb-4 rounded-md">
              <p className="mb-2">
                <span className="font-bold">Marca:</span> {automovil.marca}
              </p>
              <p className="mb-2">
                <span className="font-bold">Modelo:</span> {automovil.modelo}
              </p>
              <p className="mb-2">
                <span className="font-bold">Año:</span> {automovil.anio}
              </p>
              <p className="mb-2">
                <span className="font-bold">Patente:</span> {automovil.patente}
              </p>
              <p className="mb-2">
                <span className="font-bold">Cuotas Pagadas:</span>{" "}
                {automovil.pagosHechos.$values.length}
              </p>
              <p className="mb-2">
                <span className="font-bold">Cuotas por Pagar:</span>{" "}
                {automovil.cuotas.$values.length -
                  automovil.pagosHechos.$values.length}
              </p>

              <p className="mb-2">
                <span className="font-bold">Propietarios:</span>{" "}
                {automovil.propietarios.$values.map((propietario) => (
                  <span
                    key={propietario.$id}
                    className="ml-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                  >
                    {propietario.apeyNombre}
                  </span>
                ))}
              </p>
              <div className="mt-4">
                <button
                  onClick={() =>
                    setModalState({
                      isActive: true,
                      type: "automovil",
                      item: automovil,
                    })
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => handleDarDeBaja(e, automovil)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Dar de baja
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AutomovilList;
