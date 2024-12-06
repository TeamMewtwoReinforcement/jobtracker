import React from "react";
import NewJobForm from "./NewJobForm.tsx";


const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({
    onClose,
    children,
  }) => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-auto">
          <button
            className="absolute top-2 right-2 text-2xl text-black"
            onClick={onClose} // Close the modal
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };

export default Modal;