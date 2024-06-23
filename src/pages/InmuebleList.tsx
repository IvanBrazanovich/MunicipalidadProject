import React, { useEffect, useState } from "react";
import { fetchInmuebles } from "../utils/libdb";
import Inmueble from "./Inmueble";
// import inmueblesData from '../data/inmuebles.json';

const InmuebleList = ({ setModalState }) => {
  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    const loadInmuebles = async () => {
      const data = await fetchInmuebles();
      setInmuebles(data);
    };

    loadInmuebles();
  }, []);

  const inmueblesData = [
    {
      direccion: "Av. Principal 123",
      superficie: 120.5,
      nomenclatura_catastral: "ABC123",
      cuotas_pagadas: 5,
      cuotas_por_pagar: 3,
      propietario: "Juan Pérez",
    },
    {
      direccion: "Calle Secundaria 456",
      superficie: 80.75,
      nomenclatura_catastral: "XYZ789",
      cuotas_pagadas: 7,
      cuotas_por_pagar: 1,
      propietario: "María Gómez",
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Listado de Inmuebles</h2>
      <ul>
        {inmueblesData.map((inmueble, index) => (
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
