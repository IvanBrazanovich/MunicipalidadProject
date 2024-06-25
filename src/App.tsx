import { useEffect, useState } from "react";
import { getSession } from "./utils/lib";
import { useNavigate } from "react-router-dom";
import Administrador from "./pages/Administrador";
import Usuario from "./pages/Usuario";

function App() {
  const [usuario, setUsuario] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCookie() {
      const session = await getSession();
      if (!session) return navigate("/auth/signin");

      const { usuario } = session;
      setUsuario(usuario);
    }

    fetchCookie();
  }, []);

  if (usuario === null) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {usuario.tipo === 1 ? (
        <Administrador usuario={usuario} />
      ) : (
        <Usuario usuario={usuario} />
      )}
    </div>
  );
}

export default App;
