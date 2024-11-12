import React from "react";
import usePokemonList from "../../Hooks/usePokemonList";
import PokemonCard from "../PokemonCard/PokemonCard";

export default function PokemonList() {
  const { pokemonList } = usePokemonList();

  return (
    <div>
      {pokemonList.map((pokemonInfo) => (
        <PokemonCard key={pokemonInfo.id} pokemonInfo={pokemonInfo} />
      ))}
    </div>
  );
}
