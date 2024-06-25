"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../utils/lib";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombreyApellido, setNombre] = useState("");
  const [tipo, setTipo] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el registro
    signUp({ email, password, nombreyApellido, tipo });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Registrarse</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nombreyApellido" className="block text-gray-700">
            Nombre y Apellido
          </label>
          <input
            required
            type="text"
            id="nombreyApellido"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={nombreyApellido}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tipo" className="block text-gray-700">
            Tipo de Propietario
          </label>
          <select
            required
            id="tipo"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="1">Administrador</option>
            <option value="2">Usuario</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/auth/signin" className="text-indigo-500">
          Iniciar Sesión
        </Link>
      </p>
    </div>
  );
}
