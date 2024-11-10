import React, { createContext, useState } from "react";

export const PokemonListContext = createContext();

export default function PokemonListProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);

  return (
    <PokemonListContext.Provider value={{ pokemonList, setPokemonList }}>
      {children}
    </PokemonListContext.Provider>
  );
}
