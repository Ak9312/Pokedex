import React from "react";
import Banner from "../../assets/banner.png";

export default function PokeBanner() {
  return (
    <div className="flex justify-center">
      <img src={Banner} className="w-48 h-24 mt-3"/>
    </div>
  );
}
