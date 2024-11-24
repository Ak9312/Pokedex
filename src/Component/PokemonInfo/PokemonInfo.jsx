import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PokemonInfo({ open, onClose, name, url }) {
  const Pokemon = useRef(null);

  useEffect(() => {
    const dialogElement = Pokemon.current;
    if (!dialogElement) return;
    if (open) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
    return () => {
      if (dialogElement.open) {
        dialogElement.close();
      }
    };
  }, [open]);

  return createPortal(
    <dialog ref={Pokemon} onClose={onClose}>
      <h1 className="capitalize">{name}</h1>
      <h1>{url}</h1>
      <button onClick={onClose}>Close</button>

    </dialog>,
    document.getElementById("modal")
  );
}
