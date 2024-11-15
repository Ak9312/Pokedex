import React, { createContext, useState } from "react";

export const PokemonFilteredList = createContext();

export default function PokemonFilteredListContext({children}) {
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  return (<PokemonFilteredList.Provider value={{filteredPokemonList,setFilteredPokemonList}}>
    {children}
  </PokemonFilteredList.Provider>);
}
