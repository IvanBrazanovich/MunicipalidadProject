import React from "react";
// import automovilesData from "../data/automoviles.json";

const AutomovilList = ({ setModalState }) => {
  const automovilesData = [
    {
      marca: "Toyota",
      modelo: "Corolla",
      anio: 2018,
      patente: "AB123CD",
      cuotas_pagadas: 10,
      cuotas_por_pagar: 2,
      propietario: "Carlos Sánchez",
    },
    {
      marca: "Ford",
      modelo: "Focus",
      anio: 2020,
      patente: "EF456GH",
      cuotas_pagadas: 8,
      cuotas_por_pagar: 4,
      propietario: "Ana Martínez",
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Listado de Automóviles</h2>
      <ul>
        {automovilesData.map((automovil, index) => (
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
              {automovil.cuotas_pagadas}
            </p>
            <p className="mb-2">
              <span className="font-bold">Cuotas por Pagar:</span>{" "}
              {automovil.cuotas_por_pagar}
            </p>
            <p className="mb-2">
              <span className="font-bold">Propietario:</span>{" "}
              {automovil.propietario}
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
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Dar de baja
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutomovilList;
