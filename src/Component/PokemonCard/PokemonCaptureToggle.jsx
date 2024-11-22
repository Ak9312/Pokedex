import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import useCapturedPokemons from "../../Hooks/useCapturedPokemons";

export default function PokemonCaptureToggle(props) {
  const { pokemonName, pokemonId } = props;
  const { capturedPokemons, addCapturedPokemon, removeCapturedPokemon } =
    useCapturedPokemons();
  const [currentCaptured, setCurrentCaptured] = useState(false);

  // Check if the Pokémon is already captured when capturedPokemons changes
  useEffect(() => {
    const isCaptured = capturedPokemons.some(
      (pokemon) => pokemon.pokemonId === pokemonId
    );
    setCurrentCaptured(isCaptured);
  }, [capturedPokemons, pokemonId]); // Add pokemonId as dependency

  // Capture handler
  const capturePokemonHandler = () => {
    addCapturedPokemon(pokemonId, pokemonName);
  };

  // Uncapture handler
  const uncapturePokemonHandler = () => {
    removeCapturedPokemon(pokemonId);
  };

  return (
    <div>
      <div className="flex justify-center gap-x-2 md:gap-x-5 text-center cursor-pointer p-2 mt-3">
        {currentCaptured ? (
          // Render the toggle for uncapturing if already captured
          <div>
            <FontAwesomeIcon
              icon={faToggleOn}
              className="text-4xl text-red-500 mr-1 md:text-3xl"
              onClick={uncapturePokemonHandler}
            />
          </div>
        ) : (
          // Render the toggle for capturing if not captured
          <div>
            <FontAwesomeIcon
              icon={faToggleOff}
              className="text-4xl text-gray-500 mr-1 md:text-3xl"
              onClick={capturePokemonHandler}
            />
          </div>
        )}
        <div>
          <p className="text-xl align-baseline">Captured</p>
        </div>
      </div>
    </div>
  );
}
