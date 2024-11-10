import { useEffect } from "react";
import { POKEMON_MAIN_API } from "./API/constants";
import PokemonList from "./Component/PokemonList/PokemonList";
import usePokemonList from "./Hooks/usePokemonList";

const LIMIT = 150;
const OFFSET = 0;

function App() {
  const { setPokemonList } = usePokemonList();

  const getAllPokemonData = async () => {
    const response = await fetch(
      `${POKEMON_MAIN_API}?limit=${LIMIT}&offset=${OFFSET}`
    );
    const data = await response.json();
    return data.results;
  };
  useEffect(() => {
    const fetchAllPokemonData = async () => {
      const pokemonApiResponse = await getAllPokemonData();
      setPokemonList(pokemonApiResponse);
    };

    fetchAllPokemonData();
  }, [setPokemonList]);

  return (
    <>
      <PokemonList />
    </>
  );
}

export default App;
