import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import usePokemonFilteredList from "../../Hooks/usePokemonFilteredList";

export default function PokemonList() {
  const { filteredPokemonList } = usePokemonFilteredList();

  return (
    <>
      <div className="text-center my-3.5 text-3xl	">
        Result (
        <span className="text-red-500">{filteredPokemonList.length}</span>)
      </div>
      {filteredPokemonList.length === 0 && <p className="flex justify-center">No pokemon found!</p>}
      <div className="flex flex-wrap gap-4 justify-center ">
        {filteredPokemonList.map((pokemonInfo) => (
          <PokemonCard key={pokemonInfo.id} pokemonInfo={pokemonInfo} />
        ))}
      </div>
    </>
  );
}
