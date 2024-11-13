import React from "react";
import usePokemonList from "../../Hooks/usePokemonList";
import PokemonCard from "../PokemonCard/PokemonCard";

export default function PokemonList() {
  const { pokemonList } = usePokemonList();

  return (
    <>
      <div className="text-center my-3.5 text-3xl	">
        Result (<span className="text-red-500">{pokemonList.length}</span>)
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {pokemonList.map((pokemonInfo) => (
          <PokemonCard key={pokemonInfo.id} pokemonInfo={pokemonInfo} />
        ))}
      </div>
    </>
  );
}
