import React, { useEffect, useState } from "react";

import PokemonCaptureToggle from "./PokemonCaptureToggle";

export default function PokemonCard(props) {
  const { id, name, url, thumbnail } = props.pokemonInfo;

  return (
    <>
      <div className="box-border h-80 w-60 md:w-80 border-4 rounded-xl hover:bg-cyan-50 cursor-pointer">
        <p className="text-center	text-slate-500">#{id}</p>
        <div className="flex justify-center	my-6">
          <div className="  h-1/2 w-1/2 ">
            <img src={thumbnail} className="h-32 w-32 " />
          </div>
        </div>
        <p className="text-center text-3xl	 font-bold capitalize">{name}</p>
        <PokemonCaptureToggle pokemonId={id} pokemonName={name} />
      </div>
    </>
  );
}
