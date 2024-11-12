import React from "react";
import usePokemonList from "../../Hooks/usePokemonList";
import PokemonCard from "../PokemonCard/PokemonCard";

export default function PokemonList() {
  const { pokemonList } = usePokemonList();

  return (
    <div className="flex flex-wrap gap-4	">
      {pokemonList.map((pokemonInfo) => (
       
        <PokemonCard key={pokemonInfo.id} pokemonInfo={pokemonInfo} />
      
      ))}
    </div>
  );
}
