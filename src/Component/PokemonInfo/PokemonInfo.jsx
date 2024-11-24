import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { pokemonTypeColorScheme } from "../../utilities/PokemonTypeColorScheme";
// import { pokemonTypeColorScheme } from "./pokemonTypeColorScheme"; // Import the color scheme

export default function PokemonInfo({ modalOpen, onClose, name, url }) {
  pokemonTypeColorScheme;
  const modalRef = useRef(null);

  // State to manage the data, loading, and error states
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the details when modalOpen is true
  useEffect(() => {
    if (modalOpen) {
      // Set loading to true when fetching starts
      setLoading(true);
      setError(null); // Clear previous errors

      // Fetch Pokémon details from the provided URL
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Set the fetched data and mark loading as false
          setPokemonDetails(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch details");
          setLoading(false);
          console.error("Error fetching data:", err);
        });
    }
  }, [modalOpen, url]);

  if (!modalOpen) return null; // Don't render anything if modal is not open

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose} // Close the modal when clicking the backdrop
    >
      <div
        ref={modalRef}
        className="w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] bg-white p-6 rounded-lg shadow-lg z-60 relative overflow-hidden flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600"
        >
          <span className="text-xl font-bold">X</span>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="capitalize text-xl font-semibold mb-4">{name}</h1>

          {/* Loading or error state */}
          {loading && <p className="text-lg text-gray-600">Loading...</p>}
          {error && <p className="text-lg text-red-500">{error}</p>}

          {/* Show the fetched data when available */}
          {pokemonDetails && !loading && !error && (
            <div className="w-full">
              <div className="flex flex-col items-center space-y-2 mb-6">
                <h2 className="text-gray-600 text-lg">
                  Height: {pokemonDetails.height}
                </h2>
                <h2 className="text-gray-600 text-lg">
                  Weight: {pokemonDetails.weight}
                </h2>
                <h2 className="text-gray-600 text-lg">Abilities:</h2>
                <ul className="space-y-1">
                  {pokemonDetails.abilities.map((ability, index) => (
                    <li key={index} className="text-gray-600 text-lg">
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Power Type */}
              <div className="flex space-x-2 mb-6">
                {pokemonDetails.types.map((type, index) => {
                  const typeStyle = pokemonTypeColorScheme[type.type.name] || {
                    bg: "bg-gray-500", // Default to gray if type is not found
                    text: "text-white",
                  };

                  return (
                    <p
                      key={index}
                      className={`text-sm font-bold px-3 py-1 rounded-full ${typeStyle.text} ${typeStyle.bg}`}
                    >
                      {type.type.name}
                    </p>
                  );
                })}
              </div>

              {/* Stats */}
              <p className="font-bold text-lg text-center mb-2">Base Stats</p>
              <div className="w-full">
                {["hp", "atk", "def", "satk"].map((stat) => (
                  <div
                    key={stat}
                    className="flex items-center justify-between mb-2"
                  >
                    <p className="text-sm font-bold">{stat.toUpperCase()}</p>
                    <div className="flex items-center space-x-2">
                      <progress
                        value={
                          pokemonDetails.stats.find((s) => s.stat.name === stat)
                            ?.base_stat || 0
                        }
                        max="100"
                        className="w-32 h-2 rounded-lg"
                      />
                      <p className="text-sm">
                        {pokemonDetails.stats.find((s) => s.stat.name === stat)
                          ?.base_stat || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              {/* <p className="text-gray-700 text-center mt-4">
                {pokemonDetails?.flavor_text_entries[0]?.flavor_text || "No description available."}
              </p> */}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal") // Render to the body
  );
}
