import React, { useEffect, useState } from "react";

const Inmueble = ({ inmueble }) => {
  const [cuotasRestantes, setCuotasRestantes] = useState(1);

  useEffect(() => {
    setCuotasRestantes(
      inmueble.cuotas.$values.length - inmueble.pagosHechos.$values.length
    );
  }, [inmueble]);

  const getNextCuotaId = () => {
    // Obtener las cuotas pagadas
    const cuotasPagadas = inmueble.pagosHechos.$values.map(
      (pago) => pago.idcuota
    );
    // Encontrar el índice de la siguiente cuota a pagar
    const siguienteIndice = cuotasPagadas.length;

    // Obtener el ID de la siguiente cuota a pagar
    const siguienteCuotaId = inmueble.cuotas.$values[siguienteIndice]?.idcuota;
    return siguienteCuotaId;
  };

  console.log(inmueble);
  // Función para manejar el pago
  const handlePago = async (e, inmueble) => {
    e.preventDefault();
    // Preparar el payload para el pago
    const payload = {
      Idcuota: getNextCuotaId(), // ID de la cuota asociada al pago
      Idbien: inmueble.idbien,
      Fecha_pago: new Date(),
      Monto_pagado: 10000,
      propietarios: inmueble.propietarios.$values.map((propietario) => ({
        idPropietario: propietario.idPropietario,
        apeyNombre: propietario.apeyNombre,
        direccion: propietario.direccion,
        email: propietario.email,
        estadoCivil: propietario.estadoCivil,
        fechanac: propietario.fechanac,
        numdoc: propietario.numdoc,
        tipo: propietario.tipo,
      })),
    };
    console.log(payload);

    try {
      // Realizar la petición POST al API para realizar el pago
      const response = await fetch(`http://localhost:5123/api/pago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Pago realizado:", data);
      // Aquí podrías actualizar el estado o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al realizar el pago:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <li className="border p-4 mb-4 rounded-md bg-gray-800 text-white">
      <p className="mb-2">
        <span className="font-bold text-blue-500">Dirección:</span>{" "}
        {inmueble.direccion}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Superficie:</span>{" "}
        {inmueble.superficie}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Nomenclatura Catastral:</span>{" "}
        {inmueble.nomenclatura_catastral}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Año:</span> {inmueble.anio}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Cuotas Pagadas:</span>{" "}
        {inmueble.pagosHechos.$values.length}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Cuotas por Pagar:</span>{" "}
        {cuotasRestantes}
      </p>

      {cuotasRestantes > 0 ? (
        <button
          onClick={(e) => handlePago(e, inmueble)}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          Pagar
        </button>
      ) : null}
    </li>
  );
};

export default Inmueble;
