import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function PokemonControlBar() {
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
          <select className="w-full sm:w-full md:w-4/12 border-4 rounded-xl text-left bg-gray-100 px-2 cursor-pointer">
            <option className="bg-gray-300 text-black p-2 rounded   ">
              Select By
            </option>
            <option className="bg-gray-300 text-black p-2 rounded   ">
              Captured
            </option>
            <option className="bg-gray-300 text-black p-2 rounded ">
              Not Captured
            </option>
          </select>
          <select className="w-full sm:w-full md:w-4/12 border-4 rounded-xl text-left bg-gray-100 px-2 cursor-pointer">
            <option className="bg-gray-300 text-black p-2 rounded   ">
              Sort By
            </option>
            <option className="bg-gray-300 text-black p-2 rounded   ">
              Name
            </option>
            <option className="bg-gray-300 text-black p-2 rounded ">Id</option>
          </select>
        </div>
      </div>
    </>
  );
}
