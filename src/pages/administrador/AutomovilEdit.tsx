import React, { useEffect, useState } from "react";

const AutomovilEdit = ({
  closeModal,
  item,
  handleSubmit,
  handleSubmitAlta,
  type,
  typeAlta,
}) => {
  console.log(item);
  // Estado local para los datos del formulario
  const [formData, setFormData] = useState({
    marca: item?.marca || "",
    patente: item?.patente || "",
    anio: item?.anio || 1,
    modelo: item?.modelo || "",
    cuotas_pagadas: item?.cuotas_pagadas || "",
    cuotas_por_pagar: item?.cuotas_por_pagar || "",
    propietarios: item?.propietarios || [],
    idBien: item?.idbien || "",
  });

  const [propietarios, setPropietarios] = useState(formData?.propietarios);
  const [totalPropietarios, setTotalPropietarios] = useState([]);

  useEffect(() => {
    setFormData({ ...formData, propietarios });
  }, [propietarios.$values]);

  // Función para actualizar el estado al cambiar el input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar la adición de propietarios seleccionados
  const handleAgregarPropietario = (e) => {
    const propietarioId = e.target.value;
    const propietarioSeleccionado = totalPropietarios?.$values.find(
      (propietario) => propietario.idPropietario === parseInt(propietarioId)
    );

    if (
      propietarioSeleccionado &&
      !propietarios?.$values?.some(
        (p) => p.idPropietario === propietarioSeleccionado.idPropietario
      )
    ) {
      setPropietarios({
        ...propietarios,
        $values: propietarios.$values
          ? [...propietarios?.$values, propietarioSeleccionado]
          : [propietarioSeleccionado],
      });
    }
  };
  // Función para manejar la eliminación de propietarios
  const handleEliminarPropietario = (idPropietario) => {
    const filteredPropietarios = propietarios?.$values.filter(
      (propietario) => propietario.idPropietario !== idPropietario
    );
    setPropietarios({ ...propietarios, $values: filteredPropietarios });
  };

  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const response = await fetch("http://localhost:5123/api/propietarios");
        if (!response.ok) {
          throw new Error("Error al cargar los propietarios");
        }
        const data = await response.json();
        console.log(data);
        setTotalPropietarios(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPropietarios();
  }, []);

  return (
    <div className="p-6 text-gray-700 bg-white rounded-lg shadow-lg bg-gray-400">
      <h2 className="text-2xl font-bold mb-4">Editar Automóvil</h2>
      <form
        onSubmit={
          type === "alta"
            ? (e) =>
                handleSubmitAlta(e, {
                  ...formData,
                  propietarios: propietarios.$values,
                  tipo: typeAlta === "inmueble" ? 2 : 1,
                })
            : (e) => handleSubmit(e, formData)
        }
        className="space-y-4  "
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marca:
          </label>
          <input
            required
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Modelo:
          </label>
          <input
            required
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Año:
          </label>
          <input
            required
            type="number"
            name="anio"
            value={formData.anio}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Patente:
          </label>
          <input
            required
            type="text"
            name="patente"
            value={formData.patente}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label
            htmlFor="propietarios"
            className="block text-sm font-medium text-gray-700"
          >
            Propietarios:
          </label>
          <div className="space-y-4">
            {propietarios?.$values?.map((propietario) => (
              <div
                key={propietario.idPropietario}
                className="flex items-center border rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 p-4 flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4 flex-grow">
                    <p className="text-lg font-semibold text-gray-800">
                      {propietario.apeyNombre}
                    </p>
                    <p className="text-sm text-gray-600">
                      <b className="semibold text-sm">ID:</b>{" "}
                      <span className="bg-blue-100 text-blue-800 rounded px-2 py-1">
                        {propietario.idPropietario}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleEliminarPropietario(propietario.idPropietario)
                    }
                    className="px-3 py-1 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4 mt-2">
            <select
              name="propietario"
              onChange={handleAgregarPropietario}
              className="w-1/2 block bg-gray-500 focus:ring-blue-500 p-3 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
            >
              <option value="" className="bg-white text-gray-800">
                Selecciona un propietario
              </option>
              {totalPropietarios?.$values?.map((propietario) => (
                <option
                  key={propietario.idPropietario}
                  value={propietario.idPropietario}
                  className="bg-white text-gray-800"
                >
                  {propietario.apeyNombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AutomovilEdit;
