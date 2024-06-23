"use client";

import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { login } from "../utils/lib";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    console.log("llega");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
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
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-4">
        ¿No tienes una cuenta?{" "}
        <Link to="/auth/signup" className="text-indigo-500">
          Registrarse
        </Link>
      </p>
    </div>
  );
}
