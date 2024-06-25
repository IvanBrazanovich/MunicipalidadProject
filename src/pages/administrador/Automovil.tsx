import React from "react";
// import { fetchPropietarios } from "../utils/libdb";

const Automovil = ({ automovil, setModalState, handleDarDeBaja }) => {
  return (
    <li className="border p-4 mb-4 rounded-md bg-gray-800 text-white">
      <p className="mb-2">
        <span className="font-bold text-green-500">Marca:</span>{" "}
        {automovil.marca}
      </p>
      <p className="mb-2">
        <span className="font-bold text-green-500">Modelo:</span>{" "}
        {automovil.modelo}
      </p>
      <p className="mb-2">
        <span className="font-bold text-green-500">Año:</span> {automovil.anio}
      </p>
      <p className="mb-2">
        <span className="font-bold text-green-500">Patente:</span>{" "}
        {automovil.patente}
      </p>
      <p className="mb-2">
        <span className="font-bold text-green-500">Cuotas Pagadas:</span>{" "}
        {automovil.pagosHechos.$values.length}
      </p>
      <p className="mb-2">
        <span className="font-bold text-green-500">Cuotas por Pagar:</span>{" "}
        {automovil.cuotas.$values.length - automovil.pagosHechos.$values.length}
      </p>

      <p className="mb-2">
        <span className="font-bold text-green-500">Propietarios:</span>{" "}
        {automovil.propietarios.$values.map((propietario) => (
          <span
            key={propietario.$id}
            className="ml-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {propietario.apeyNombre}
          </span>
        ))}
      </p>
      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() =>
            setModalState({
              isActive: true,
              type: "automovil",
              item: automovil,
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          Editar
        </button>
        <button
          onClick={(e) => handleDarDeBaja(e, automovil)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          Dar de baja
        </button>
      </div>
    </li>
  );
};

export default Automovil;
