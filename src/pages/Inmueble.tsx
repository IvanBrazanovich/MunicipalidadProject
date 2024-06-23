import React from "react";
// import { fetchPropietarios } from "../utils/libdb";

const Inmueble = ({ inmueble, setModalState }) => {
  return (
    <li className="border p-4 mb-4 rounded-md">
      <p className="mb-2">
        <span className="font-bold">Dirección:</span> {inmueble.direccion}
      </p>
      <p className="mb-2">
        <span className="font-bold">Superficie:</span> {inmueble.superficie}
      </p>
      <p className="mb-2">
        <span className="font-bold">Nomenclatura Catastral:</span>{" "}
        {inmueble.nomenclatura_catastral}
      </p>
      <p className="mb-2">
        <span className="font-bold">Cuotas Pagadas:</span>{" "}
        {inmueble.cuotas_pagadas}
      </p>
      <p className="mb-2">
        <span className="font-bold">Cuotas por Pagar:</span>{" "}
        {inmueble.cuotas_por_pagar}
      </p>
      <p className="mb-2">
        <span className="font-bold">Propietario:</span> {inmueble.propietario}
      </p>
      <button
        onClick={() =>
          setModalState({
            isActive: true,
            type: "inmueble",
            item: inmueble,
          })
        }
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Editar
      </button>
    </li>
  );
};

export default Inmueble;
