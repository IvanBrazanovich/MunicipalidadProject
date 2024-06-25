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
        {inmueble.nomenclatura_Catastral}
      </p>
      <p className="mb-2">
        <span className="font-bold">Cuotas Pagadas:</span>{" "}
        {inmueble.pagosHechos.$values.length}
      </p>
      <p className="mb-2">
        <span className="font-bold">Cuotas por Pagar:</span>{" "}
        {inmueble.cuotas.$values.length - inmueble.pagosHechos.$values.length}
      </p>

      <p className="mb-2">
        <span className="font-bold">Propietarios:</span>{" "}
        {inmueble.propietarios.$values.map((propietario) => (
          <span
            key={propietario.$id}
            className="ml-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {propietario.apeyNombre}
          </span>
        ))}
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
