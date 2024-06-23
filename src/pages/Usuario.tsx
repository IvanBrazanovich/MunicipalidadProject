import React from "react";
import { logout } from "../utils/lib";
import { useNavigate } from "react-router-dom";

const Usuario = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Usuario</h1>
      <button
        onClick={async () => {
          await logout();
          navigate("/auth/signin");
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Usuario;
