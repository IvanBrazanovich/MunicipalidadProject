import React, { useState } from "react";
import AutomovilList from "./administrador/AutomovilList";
import InmuebleList from "./administrador/InmuebleList";
import { logout } from "../utils/lib";
import { useNavigate } from "react-router-dom";
import InmuebleEdit from "./administrador/InmuebleEdit";
import Modal from "react-modal";
import AutomovilEdit from "./administrador/AutomovilEdit";

const Administrador = ({ usuario }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5123/api/bien/${formData.idBien}`,
        {
          method: "PUT", // o 'PATCH' si es necesario
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud de edición");
      }

      // Manejar la respuesta si es necesario
      const data = await response.json();
      console.log("Edición exitosa:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    closeModal();
  };

  const handleSubmitAlta = async (e, formData) => {
    e.preventDefault();
    const dataObject = formData;
    console.log(dataObject);

    delete dataObject.idBien;
    delete dataObject.cuotas;
    delete dataObject.pagosHechos;
    try {
      const response = await fetch(`http://localhost:5123/api/bien`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud de alta");
      }

      // Manejar la respuesta si es necesario
      const data = await response.json();
      console.log("Alta exitosa:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    closeModal();
  };

  const closeModal = () => {
    setModalState({
      isActive: false,
      type: null,
      item: null,
    });

    setModalStateAlta({
      isActive: false,
      type: null,
      item: null,
    });
  };

  const [modalState, setModalState] = useState({
    isActive: false,
    type: null,
    item: null,
  });

  const [modalStateAlta, setModalStateAlta] = useState({
    isActive: false,
    type: null,
    item: null,
  });

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Administrador Municipal</h1>
            <span className="text-lg font-medium">
              Bienvenido, {usuario.apeyNombre}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                setModalStateAlta({
                  isActive: true,
                  type: "inmueble",
                  item: {},
                })
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Alta Inmueble
            </button>
            <button
              onClick={() =>
                setModalStateAlta({
                  isActive: true,
                  type: "automovil",
                  item: {},
                })
              }
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Alta Automóvil
            </button>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inmuebles List */}
          <section className="bg-gray-700 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Inmuebles
            </h2>
            <div className="divide-y divide-gray-600">
              <InmuebleList setModalState={setModalState} />
            </div>
          </section>

          {/* Automoviles List */}
          <section className="bg-gray-700 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-green-500 mb-4">
              Automóviles
            </h2>
            <div className="divide-y divide-gray-600">
              <AutomovilList setModalState={setModalState} />
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      <Modal
        className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 overflow-y-auto"
        isOpen={modalState.isActive}
        onRequestClose={closeModal}
        contentLabel="Modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-8 rounded-lg shadow-lg w-full md:w-1/2 mx-4 md:mx-0 my-0 md:my-auto overflow-y-auto  text-white">
          {modalState.isActive && modalState.type === "inmueble" && (
            <InmuebleEdit
              handleSubmit={handleSubmit}
              item={modalState.item}
              type="edit"
              closeModal={closeModal}
            />
          )}
          {modalState.isActive && modalState.type === "automovil" && (
            <AutomovilEdit
              handleSubmit={handleSubmit}
              item={modalState.item}
              type="edit"
              closeModal={closeModal}
            />
          )}
        </div>
      </Modal>

      <Modal
        className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 overflow-y-auto"
        isOpen={modalStateAlta.isActive}
        onRequestClose={closeModal}
        contentLabel="Modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-8 rounded-lg shadow-lg w-full md:w-1/2 mx-4 md:mx-0 my-0 md:my-auto overflow-y-auto  text-white">
          {modalStateAlta.isActive && modalStateAlta.type === "inmueble" && (
            <InmuebleEdit
              type="alta"
              handleSubmitAlta={handleSubmitAlta}
              item={modalStateAlta.item}
              closeModal={closeModal}
              typeAlta="inmueble"
            />
          )}
          {modalStateAlta.isActive && modalStateAlta.type === "automovil" && (
            <AutomovilEdit
              type="alta"
              handleSubmitAlta={handleSubmitAlta}
              item={modalStateAlta.item}
              closeModal={closeModal}
              typeAlta="automovil"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};
Modal.setAppElement("#root");
export default Administrador;
