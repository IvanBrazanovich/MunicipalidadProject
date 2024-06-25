import React, { useEffect, useState } from "react";

const Automovil = ({ automovil }) => {
  // Determinar el ID de la próxima cuota a pagar

  const [cuotasRestantes, setCuotasRestantes] = useState(1);

  useEffect(() => {
    setCuotasRestantes(
      automovil.cuotas.$values.length - automovil.pagosHechos.$values.length
    );
  }, [automovil]);

  const getNextCuotaId = () => {
    // Obtener las cuotas pagadas
    const cuotasPagadas = automovil.pagosHechos.$values.map(
      (pago) => pago.idcuota
    );
    // Encontrar el índice de la siguiente cuota a pagar
    const siguienteIndice = cuotasPagadas.length;
    // Obtener el ID de la siguiente cuota a pagar
    const siguienteCuotaId = automovil.cuotas.$values[siguienteIndice]?.idCuota;
    return siguienteCuotaId;
  };

  // Función para manejar el pago
  const handlePago = async (e, automovil) => {
    e.preventDefault();

    // Preparar el payload para el pago
    const payload = {
      Idcuota: getNextCuotaId(), // ID de la cuota asociada al pago
      Idbien: automovil.idbien,
      Fecha_pago: new Date(),
      Monto_pagado: 10000,
      propietarios: automovil.propietarios.$values.map((propietario) => ({
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
        <span className="font-bold text-blue-500">Marca:</span>{" "}
        {automovil.marca}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Modelo:</span>{" "}
        {automovil.modelo}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Año:</span> {automovil.anio}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Patente:</span>{" "}
        {automovil.patente}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Cuotas Pagadas:</span>{" "}
        {automovil.pagosHechos.$values.length}
      </p>
      <p className="mb-2">
        <span className="font-bold text-blue-500">Cuotas por Pagar:</span>{" "}
        {automovil.cuotas.$values.length - automovil.pagosHechos.$values.length}
      </p>

      {cuotasRestantes > 0 ? (
        <button
          onClick={(e) => handlePago(e, automovil)}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          Pagar
        </button>
      ) : null}
    </li>
  );
};

export default Automovil;
