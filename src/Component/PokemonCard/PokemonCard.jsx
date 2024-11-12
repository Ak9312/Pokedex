import React, { useEffect, useState } from "react";

export default function PokemonCard(props) {
  const { id, name, url, thumbnail } = props.pokemonInfo;

  return (
    <>
 
   
      <div className=" mx-2.5 box-border h-72 w-72 border-4 rounded-xl		 ">
        <p className="text-center	text-slate-500">#{id}</p>
        <div className="flex justify-center	my-6">
        <div  className="  h-1/2 w-1/2 "> 
          <img src={thumbnail} className="h-32 w-32 " />
          </div>
        </div>
        <p className="text-center text-3xl	 font-bold capitalize">{name}</p>
   <p className="text-center	">Captured</p>
      </div>
     
     
    </>
  );
}
