import React, { useState } from "react";
import AutomovilList from "./AutomovilList";
import InmuebleList from "./InmuebleList";
import { logout } from "../utils/lib";
import { useNavigate } from "react-router-dom";
import InmuebleEdit from "./InmuebleEdit";
import Modal from "react-modal";
import AutomovilEdit from "./AutomovilEdit";

const Administrador = () => {
  const navigate = useNavigate();

  const closeModal = () => {
    setModalState({
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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Administrador Municipal</h1>
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
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
        isOpen={modalState.isActive}
        contentLabel="Example Modal"
      >
        <div className=" p-8 rounded-lg shadow-lg w-full md:w-1/2 mx-4 md:mx-0 my-0 md:my-auto">
          {modalState.isActive && modalState.type === "inmueble" && (
            <InmuebleEdit item={modalState.item} closeModal={closeModal} />
          )}
          {modalState.isActive && modalState.type === "automovil" && (
            <AutomovilEdit
              handleSubmit={() => {}}
              item={modalState.item}
              closeModal={closeModal}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};
Modal.setAppElement("#root");
export default Administrador;
