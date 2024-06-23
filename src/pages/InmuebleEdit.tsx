import React from "react";

const InmuebleEdit = ({ closeModal, item, handleSubmit }) => {
  const handleInputChange = () => {};
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Editar Inmueble</h2>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dirección:
          </label>
          <input
            type="text"
            name="direccion"
            value={item.direccion}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Superficie:
          </label>
          <input
            type="text"
            name="superficie"
            value={item.superficie}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nomenclatura Catastral:
          </label>
          <input
            type="text"
            name="nomenclatura_catastral"
            value={item.nomenclatura_catastral}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cuotas Pagadas:
          </label>
          <input
            type="text"
            name="cuotas_pagadas"
            value={item.cuotas_pagadas}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cuotas por Pagar:
          </label>
          <input
            type="text"
            name="cuotas_por_pagar"
            value={item.cuotas_por_pagar}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Propietario:
          </label>
          <input
            type="text"
            name="propietario"
            value={item.propietario}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
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

export default InmuebleEdit;
