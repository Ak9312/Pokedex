import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function PokemonInfo({ modalOpen, onClose, name, url }) {
  const modalRef = useRef(null);

  // Open the modal when modalOpen is true
  useEffect(() => {
    if (modalOpen && modalRef.current) {
      // Modal will be visible when modalOpen is true
    } else if (modalRef.current) {
      // Modal will be removed when modalOpen is false
    }
  }, [modalOpen]);

  if (!modalOpen) return null; // Don't render anything if modal is not open

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose} // Close the modal when clicking the backdrop
    >
      <div
        ref={modalRef}
        className="w-[80%] h-[80%] bg-white p-6 rounded-none shadow-lg z-60 relative overflow-hidden  top-0 left-0 flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600"
        >
          <span className="text-2xl font-bold">X</span> {/* Larger "X" */}
        </button>

        {/* Content */}
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="capitalize text-4xl font-semibold">{name}</h1>
          <h2 className="text-gray-600 mt-2 text-lg">{url}</h2>
        </div>
      </div>
    </div>,
    document.getElementById("modal") // Render to the body
  );
}
