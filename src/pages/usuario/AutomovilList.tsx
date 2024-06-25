import React, { useEffect, useState } from "react";
import Automovil from "./Automovil";

const AutomovilList = () => {
  const [automoviles, setAutomoviles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        {automoviles.map((automovil, index) => (
          <Automovil key={index} automovil={automovil} />
        ))}
      </ul>
    </div>
  );
};

export default AutomovilList;
