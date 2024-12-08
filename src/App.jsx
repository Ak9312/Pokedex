import { useEffect, useState } from "react";
import { POKEMON_MAIN_API } from "./API/constants";
import PokemonList from "./Component/PokemonList/PokemonList";
import usePokemonList from "./Hooks/usePokemonList";
import usePokemonFilteredList from "./Hooks/usePokemonFilteredList";
import PokemonControlBar from "./Component/PokemonControlBar/PokemonControlBar";
import PokeBanner from "./Component/PokeBanner/PokeBanner";
import AppLoadingScreen from "./Component/AppLoadingScreen/AppLoadingScreen";

const LIMIT = 151;
const OFFSET = 0;

function App() {
  const [loading, setLoading] = useState(true); // Add loading state
  const { setPokemonList } = usePokemonList();
  const { setFilteredPokemonList } = usePokemonFilteredList();

  const getAllPokemonData = async () => {
    const response = await fetch(
      `${POKEMON_MAIN_API}?limit=${LIMIT}&offset=${OFFSET}`
    );
    const data = await response.json();
    return data.results;
  };

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      setLoading(true); // Set loading to true when fetching starts
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
      setFilteredPokemonList(pokemonDetails);
      setLoading(false); // Set loading to false when data is loaded
    };

    fetchAllPokemonData();
  }, [setPokemonList, setFilteredPokemonList]);

  return (
    <>
      <div className="mb-5">
        <PokeBanner />
        {loading ? (
          <AppLoadingScreen /> // Show loading screen when fetching data
        ) : (
          <>
            <PokemonControlBar />
            <PokemonList />
          </>
        )}
      </div>
    </>
  );
}

export default App;
