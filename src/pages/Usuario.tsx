import React from "react";
import { logout } from "../utils/lib";
import { useNavigate } from "react-router-dom";
import Automovil from "./usuario/Automovil";
import AutomovilList from "./usuario/AutomovilList";
import InmuebleList from "./usuario/InmuebleList";

const Usuario = ({ usuario }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <header className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Usuario Municipal</h1>
          <div className="flex items-center space-x-6">
            <span className="text-lg font-medium">
              Bienvenido, {usuario.apeyNombre}
            </span>
            <button
              onClick={async () => {
                await logout();
                navigate("/auth/signin");
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex">
        <div className="w-1/2 pr-4">
          <section className="bg-gray-700 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Inmuebles
            </h2>
            <div className="divide-y divide-gray-600">
              <InmuebleList />
            </div>
          </section>
        </div>
        <div className="w-1/2 pl-4">
          <section className="bg-gray-700 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Automóviles
            </h2>
            <div className="divide-y divide-gray-600">
              <AutomovilList />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Usuario;
