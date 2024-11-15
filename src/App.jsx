import { useEffect } from "react";
import { POKEMON_MAIN_API } from "./API/constants";
import PokemonList from "./Component/PokemonList/PokemonList";
import usePokemonList from "./Hooks/usePokemonList";

const LIMIT = 151;
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
      const pokemonDetails = [];
      for (const index in pokemonApiResponse) {
        const currPokemon = {
          id: parseInt(index) + 1,
          name: pokemonApiResponse[index]["name"],
          url: pokemonApiResponse[index]["url"],
          thumbnail: `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${
            parseInt(index) + 1
          }.svg`,
        };
        pokemonDetails.push(currPokemon);
      }

      setPokemonList(pokemonDetails);
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
