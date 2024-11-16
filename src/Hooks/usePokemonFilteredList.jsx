import { useContext } from "react";
import { PokemonFilteredList } from "../Context/PokemonFilteredListContext";

export default function usePokemonFilteredList() {
  return useContext(PokemonFilteredList);
}
