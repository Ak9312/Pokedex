import React, { useEffect, useState } from "react";
import PokemonCaptureToggle from "./PokemonCaptureToggle";

export default function PokemonCard(props) {
  const { id, name, url, thumbnail } = props.pokemonInfo;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="box-border h-auto w-72 md:w-80 lg:w-96 border-4 rounded-xl hover:bg-cyan-50 cursor-pointer shadow-lg">
        {/* Button */}
        <button className="bg-red-400 text-white rounded-lg p-4 md:p-2 w-full">
          Show info
        </button>

        {/* Pokemon ID */}
        <p className="text-center text-slate-500 text-sm sm:text-base mt-2">
          #{id}
        </p>

        {/* Image Container */}
        <div className="flex justify-center my-6">
          <img
            src={thumbnail}
            alt={name}
            className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain"
          />
        </div>

        {/* Pokemon Name */}
        <p className="text-center text-2xl md:text-3xl font-bold capitalize">
          {name}
        </p>

        {/* Capture Toggle */}
        <div className="p-4">
          <PokemonCaptureToggle pokemonId={id} pokemonName={name} />
        </div>
      </div>
    </div>
  );
}
