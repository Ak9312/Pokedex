import React from "react";
import pokeballLoad from "../../assets/pokeball-loading.gif";

export default function AppLoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img src={pokeballLoad} alt="loading" height={400} width={400} />
      <p className="text-xl">Loading pokemons ...</p>
    </div>
  );
}
