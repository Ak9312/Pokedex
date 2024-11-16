import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

export default function PokemonCaptureToggle() {
  return (
    <div>
      <div className="flex justify-center gap-x-2 md:gap-x-5 text-center cursor-pointer p-2 mt-3">
        <div>
          <FontAwesomeIcon
            icon={faToggleOff}
            className="text-4xl text-gray-500 mr-1 md:text-3xl "
          />
        </div>
        <div>
          <p className="text-xl align-baseline">Captured</p>
        </div>
      </div>
    </div>
  );
}
