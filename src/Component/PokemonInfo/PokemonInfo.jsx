import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { pokemonTypeColorScheme } from "../../utilities/PokemonTypeColorScheme";
import ProgressBar from "./ProgressBar";
import PokemonPic from "./PokemonPic";
import { VscSymbolRuler } from "react-icons/vsc";
import { LuWeight } from "react-icons/lu";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PokemonInfo({ modalOpen, onClose, name, url }) {
  // Stats Info.
  const statsInfo = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];
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
      onClick={onClose}
      // Close the modal when clicking the backdrop
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

        {/* Loading Skeleton */}
        {loading && (
          <SkeletonTheme baseColor="#ff0000" highlightColor="#ff6666">
            <div className="w-full">
              {/* Skeleton Title */}
              <div className="flex justify-center items-center">
                <Skeleton height={30} width={100} className="mb-4" />
              </div>

              {/* Skeleton Grid Layout for Height, Weight, Abilities */}
              <div className="grid grid-cols-3 gap-4 w-full">
                {/* Height Skeleton */}
                <div className="flex flex-col items-center border-r border-gray-300 pr-4">
                  <Skeleton height={20} width={60} className="mb-2" />
                  <Skeleton height={20} width={50} />
                </div>

                {/* Weight Skeleton */}
                <div className="flex flex-col items-center border-r border-gray-300 pr-4">
                  <Skeleton height={20} width={60} className="mb-2" />
                  <Skeleton height={20} width={50} />
                </div>

                {/* Abilities Skeleton */}
                <div className="flex flex-col items-center">
                  <Skeleton height={20} width={60} className="mb-2" />
                  <Skeleton count={3} height={20} width={60} />
                </div>
              </div>

              {/* Skeleton Power Types */}
              <div className="flex space-x-2 mb-6">
                <Skeleton width={50} height={30} />
              </div>

              {/* Skeleton Stats */}
              <p className="font-bold text-sm md:text-lg text-center mb-2">
                Base Stats
              </p>
              <div className="w-full">
                {statsInfo.map((stat, index) => (
                  <Skeleton
                    key={index}
                    height={10}
                    width="100%"
                    className="mb-2"
                  />
                ))}
              </div>
            </div>
          </SkeletonTheme>
        )}        

        {/* Content */}
        {pokemonDetails && !loading && !error && (
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="capitalize text-xl font-semibold mb-4">{name}</h1>

            {/* Loading or error state */}

            {error && <p className="text-lg text-red-500">{error}</p>}

            {/* Show the fetched data when available */}

            <div className="w-full">
              <div className="flex flex-col items-center space-y-2 mb-6">
                <PokemonPic pokemondetails={pokemonDetails} />

                <div className="grid grid-cols-3 gap-4 w-full">
                  {/* Height Column */}
                  <div className="flex flex-col items-center border-r border-gray-300 pr-4">
                    <div className="flex gap-x-2">
                      <h2 className="text-gray-400 text-xs">Height </h2>
                      <VscSymbolRuler className="size-3	md:size-auto	" />
                    </div>

                    <p className="text-gray-600 text-sm md:text-lg">
                      {parseInt(pokemonDetails.height) / 10} m
                    </p>
                  </div>

                  {/* Weight Column */}
                  <div className="flex flex-col items-center border-r border-gray-300 pr-4">
                    <div className="flex gap-x-2">
                      <h2 className="text-gray-400 text-xs">Weight</h2>
                      <LuWeight className="size-3	md:size-auto	" />
                    </div>
                    <p className="text-gray-600 text-sm md:text-lg">
                      {parseInt(pokemonDetails.weight) / 10} kg
                    </p>
                  </div>

                  {/* Abilities Column */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-gray-400 text-xs">Abilities</h2>
                    <ul className="space-y-1">
                      {pokemonDetails.abilities.map((ability, index) => (
                        <li
                          key={index}
                          className="text-gray-600 text-xs md:text-lg"
                        >
                          {ability.ability.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
              <p className="font-bold text-sm md:text-lg text-center mb-2">
                Base Stats
              </p>
              <div className="w-full">
                {statsInfo.map((stat) => {
                  const statValue =
                    pokemonDetails.stats.find((s) => s.stat.name === stat)
                      ?.base_stat || 0;
                  return (
                    <ProgressBar
                      key={stat}
                      value={statValue}
                      max={100} // Assuming max value is 100
                      label={stat.toUpperCase()}
                      primaryType={pokemonDetails.types[0].type.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modal") // Render to the body
  );
}
