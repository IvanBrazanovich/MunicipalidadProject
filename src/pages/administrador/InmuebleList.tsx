import React, { useEffect, useState } from "react";
import Inmueble from "./Inmueble";
// import inmueblesData from '../data/inmuebles.json';

const InmuebleList = ({ setModalState }) => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInmuebles();
  }, []);

  const fetchInmuebles = async () => {
    try {
      const response = await fetch("http://localhost:5123/api/bien/inmuebles");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setInmuebles(data.$values);
      console.log(data.$values);

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
      <h2 className="text-2xl font-bold mb-4 text-white">
        Listado de Inmuebles
      </h2>
      <ul>
        {inmuebles.map((inmueble, index) => (
          <Inmueble
            setModalState={setModalState}
            key={index}
            inmueble={inmueble}
          />
        ))}
      </ul>
    </div>
  );
};

export default InmuebleList;
