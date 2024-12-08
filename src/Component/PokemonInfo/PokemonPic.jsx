import React, { useState, useEffect } from "react";

export default function PokemonPic({ pokemondetails }) {
  // State to track which image to show
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    // Set an interval to toggle the image every 3 seconds
    const interval = setInterval(() => {
      setShowFront((prev) => !prev);
    }, 3000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center md:pb-5">
      <img
        src={
          showFront
            ? pokemondetails?.sprites?.front_default
            : pokemondetails?.sprites?.back_default
        }
        alt={showFront ? "pokemon front" : "pokemon back"}
        className="w-auto h-auto md:scale-150" // Scale the image by 150% on md and larger screens
      />
    </div>
  );
}
