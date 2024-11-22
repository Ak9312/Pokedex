import React, { useState, useEffect } from "react";
import usePokemonFilteredList from "../../Hooks/usePokemonFilteredList";
import usePokemonList from "../../Hooks/usePokemonList";
import useCapturedPokemons from "../../Hooks/useCapturedPokemons";

const DEBOUNCE_DELAY = 300;

export default function PokemonControlBar() {
  const { filteredPokemonList, setFilteredPokemonList } =
    usePokemonFilteredList();
  const { pokemonList } = usePokemonList();
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // For storing search input
  const [debouncedQuery, setDebouncedQuery] = useState(""); // For storing the debounced search query
  const { isCaptured } = useCapturedPokemons();

  // Handle filter by captured
  const filterByCapturedHandler = (filterType) => {
    const filteredPokemons = pokemonList.filter((pokemon) => {
      if (filterType === "Captured") {
        return isCaptured(pokemon.id); // Check if the Pokémon is captured
      } else if (filterType === "Not Captured") {
        return !isCaptured(pokemon.id); // Check if the Pokémon is not captured
      }
      return true; // Return all if filterType is 'All'
    });
    // Update the filtered list
    setFilteredPokemonList(filteredPokemons);
  };

  // Handle sorting by name
  const sortByNameHandler = () => {
    const totalPokemons = pokemonList;
    const sortedPokemons = [...totalPokemons].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setFilteredPokemonList(sortedPokemons);
  };

  // Handle sorting by ID (default sorting)
  const sortByIdHandler = () => {
    setFilteredPokemonList(pokemonList);
  };

  // Handle sort option change
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);

    if (selectedOption === "Name") {
      sortByNameHandler();
    } else if (selectedOption === "Id") {
      sortByIdHandler();
    }
    setSearchQuery("");
  };

  // Debounce implementation for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler); // Clean up timeout on component unmount or searchQuery change
    };
  }, [searchQuery]);

  // Update the filtered list when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setFilteredPokemonList(pokemonList); // Reset to all Pokémon if search query is empty
    } else {
      const filteredPokemons = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(debouncedQuery.toLowerCase())
      );
      setFilteredPokemonList(filteredPokemons); // Update filtered list based on search
    }
  }, [debouncedQuery, pokemonList, setFilteredPokemonList]);

  return (
    <>
      <div className="flex flex-col my-6 mx-10 justify-center">
        <div className="flex gap-x-4 justify-center">
          <input
            className="w-full sm:w-full md:w-1/2 border-4 rounded-xl text-left bg-gray-100 px-2"
            placeholder="Search pokemon by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 justify-center my-10">
          <label>Select by : </label>
          <select
            className="w-full sm:w-full md:w-4/12 border-4 rounded-xl text-left bg-gray-100 px-2 cursor-pointer"
            onChange={(e) => filterByCapturedHandler(e.target.value)}
          >
            <option className="bg-gray-300 text-black p-2 rounded">All</option>
            <option className="bg-gray-300 text-black p-2 rounded">
              Captured
            </option>
            <option className="bg-gray-300 text-black p-2 rounded">
              Not Captured
            </option>
          </select>
          <label>Sort by : </label>
          <select
            className="w-full sm:w-full md:w-4/12 border-4 rounded-xl text-left bg-gray-100 px-2 cursor-pointer"
            onChange={handleSortChange}
            value={sortOption}
            placeholder="Sort by"
          >
            <option className="bg-gray-300 text-black p-2 rounded">Id</option>
            <option className="bg-gray-300 text-black p-2 rounded">Name</option>
          </select>
        </div>
      </div>
    </>
  );
}
