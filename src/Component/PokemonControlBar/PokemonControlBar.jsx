import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import usePokemonFilteredList from "../../Hooks/usePokemonFilteredList";
import usePokemonList from "../../Hooks/usePokemonList";

export default function PokemonControlBar() {
  const { filteredPokemonList, setFilteredPokemonList } =
    usePokemonFilteredList();
  const { pokemonList } = usePokemonList();
  const [sortOption, setSortOption] = useState("");

  const sortByNameHandler = () => {
    const totalPokemons = pokemonList;
    const sortedPokemons = [...totalPokemons].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setFilteredPokemonList(sortedPokemons);
  };

  const sortByIdHandler = () => {
    setFilteredPokemonList(pokemonList);
  };

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);

    if (selectedOption === "Name") {
      sortByNameHandler();
    } else if (selectedOption === "Id") {
      sortByIdHandler();
    }
  };

  return (
    <>
      <div className="flex flex-col my-6 mx-10 	 justify-center ">
        <div className="flex gap-x-4  justify-center   ">
          <input
            className="w-full sm:w-full md:w-4/12 border-4 rounded-xl text-left bg-gray-100 px-2"
            placeholder="Search pokemon by name here"
          />
          <button className="  bg-red-200	 ">
            {" "}
            <FontAwesomeIcon icon={faSearch} className="p-2" />{" "}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 justify-center my-10">
          <label>Select by : </label>
          <select className="w-full sm:w-full md:w-4/12 border-4 rounded-xl text-left bg-gray-100 px-2 cursor-pointer">
            <option className="bg-gray-300 text-black p-2 rounded   ">
              Captured
            </option>
            <option className="bg-gray-300 text-black p-2 rounded ">
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
            <option className="bg-gray-300 text-black p-2 rounded   ">
              Id
            </option>
            <option className="bg-gray-300 text-black p-2 rounded ">
              Name
            </option>
          </select>
        </div>
      </div>
    </>
  );
}
