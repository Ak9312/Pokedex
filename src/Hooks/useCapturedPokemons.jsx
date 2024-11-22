import React, { useEffect, useState } from "react";

export default function useCapturedPokemons() {
  const [capturedPokemons, setCapturedPokemons] = useState([]);

  useEffect(() => {
    // Function to retrieve the captured Pokémon list from localStorage
    const getCapturedPokemonsFromStorage = () => {
      const storedPokemons = localStorage.getItem("pokemon_captured_list");
      return storedPokemons ? JSON.parse(storedPokemons) : [];
    };

    // Initialize the list of captured Pokémon from localStorage
    const pokemons = getCapturedPokemonsFromStorage();
    setCapturedPokemons(pokemons);
  }, []);

  // Function to add a new captured Pokémon to the list and update localStorage
  const addCapturedPokemon = (pokemonId, pokemonName) => {
    // Get the current list of captured Pokémon from localStorage
    const storedPokemons = localStorage.getItem("pokemon_captured_list");
    const currentPokemons = storedPokemons ? JSON.parse(storedPokemons) : [];

    // Check if the Pokémon already exists in the list
    const exists = currentPokemons.some(
      (pokemon) => pokemon.pokemonId === pokemonId
    );

    if (!exists) {
      // If not already in the list, add to the capturedPokemons
      const newCapturedPokemons = [
        ...currentPokemons,
        { pokemonId, pokemonName },
      ];

      // Update localStorage with the new list
      localStorage.setItem(
        "pokemon_captured_list",
        JSON.stringify(newCapturedPokemons)
      );

      // Update state
      setCapturedPokemons(newCapturedPokemons);
    } else {
      console.log("This Pokémon is already captured.");
    }
  };

  // Function to remove a captured Pokémon from the list and update localStorage
  const removeCapturedPokemon = (pokemonId) => {
    // Retrieve the current list from localStorage
    const storedPokemons = localStorage.getItem("pokemon_captured_list");
    const currentPokemons = storedPokemons ? JSON.parse(storedPokemons) : [];

    // Filter out the Pokémon to be removed
    const newCapturedPokemons = currentPokemons.filter(
      (pokemon) => pokemon.pokemonId !== pokemonId
    );

    // Update localStorage with the new list
    localStorage.setItem(
      "pokemon_captured_list",
      JSON.stringify(newCapturedPokemons)
    );

    // Update state to reflect the removal
    setCapturedPokemons(newCapturedPokemons);
  };

  // Return the list of captured Pokémon and the functions to add and remove Pokémon
  return [capturedPokemons, addCapturedPokemon, removeCapturedPokemon];
}
