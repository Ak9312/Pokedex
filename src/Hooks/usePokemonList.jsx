import { useContext } from "react";
import { PokemonListContext } from "../Context/PokemonListContext";

export default function usePokemonList() {
  return useContext(PokemonListContext);
}
