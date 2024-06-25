import React, { useState } from "react";
import AutomovilList from "./AutomovilList";
import InmuebleList from "./InmuebleList";
import { logout } from "../utils/lib";
import { useNavigate } from "react-router-dom";
import InmuebleEdit from "./InmuebleEdit";
import Modal from "react-modal";
import AutomovilEdit from "./AutomovilEdit";

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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">Administrador Municipal</h1>
          <div className="flex items-center space-x-6">
            <span className="text-lg font-medium">
              Bienvenido, {usuario.apeyNombre}
            </span>
            <button
              onClick={() =>
                setModalStateAlta({
                  isActive: true,
                  type: "inmueble",
                  item: {},
                })
              }
              className="bg-fuchsia-600 hover:bg-fuchsia-800 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Dar de Alta Inmueble
            </button>
            <button
              onClick={() =>
                setModalStateAlta({
                  isActive: true,
                  type: "automovil",
                  item: {},
                })
              }
              className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Dar de Alta Automóvil
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
      <main className="container mx-auto px-4 py-8 flex">
        <div className="w-1/2 pr-4">
          <InmuebleList setModalState={setModalState} />
        </div>
        <div className="w-1/2 pl-4">
          <AutomovilList setModalState={setModalState} />
        </div>
      </main>
      <Modal
        className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 overflow-y-auto"
        isOpen={modalState.isActive}
        onRequestClose={closeModal}
        contentLabel="Modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-8 rounded-lg shadow-lg w-full md:w-1/2 mx-4 md:mx-0 my-0 md:my-auto overflow-y-auto bg-white">
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
        <div className="p-8 rounded-lg shadow-lg w-full md:w-1/2 mx-4 md:mx-0 my-0 md:my-auto overflow-y-auto bg-white">
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
