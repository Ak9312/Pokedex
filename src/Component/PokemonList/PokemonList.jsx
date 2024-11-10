import React from "react";
import usePokemonList from "../../Hooks/usePokemonList";
import PokemonCard from "../PokemonCard/PokemonCard";

export default function PokemonList() {
  const { pokemonList } = usePokemonList();

  return (
    <div>
      {pokemonList.map((pokemonInfo, index) => (
        <PokemonCard key={index} pokemonInfo={pokemonInfo} />
      ))}
    </div>
  );
}
