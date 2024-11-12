import React, { useEffect, useState } from "react";

export default function PokemonCard(props) {
  const { id, name, url, thumbnail } = props.pokemonInfo;

  return (
    <>
      <div className="box-border h-72 w-72 border-4">
        <p>#{id}</p>
        <div className="h-1/2 w-1/2">
          <img src={thumbnail} className="h-32 w-32" />
        </div>
        <p>{name}</p>
      </div>
    </>
  );
}
