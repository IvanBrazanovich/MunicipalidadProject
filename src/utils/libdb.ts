// URL base de JSON-Server
const API_URL = "http://localhost:3001";

// Función para obtener todos los inmuebles
export const fetchInmuebles = async () => {};
// Función para obtener propietarios de un inmueble
export const fetchPropietarios = async (idBien) => {
  const response = await fetch(
    `${API_URL}/BienesPropietarios?Idbien=${idBien}`
  );
  const data = await response.json();
  return data;
};

// Función para obtener cuotas de un inmueble
export const fetchCuotas = async (idBien) => {
  const response = await fetch(`${API_URL}/Cuota?Id_bien=${idBien}`);
  const data = await response.json();
  return data;
};

// Función para obtener pagos de una cuota
export const fetchPagos = async (idCuota) => {
  const response = await fetch(`${API_URL}/Pagos?Id_cuota=${idCuota}`);
  const data = await response.json();
  return data;
};
