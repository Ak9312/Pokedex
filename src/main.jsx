import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import PokemonListProvider from "./Context/PokemonListContext.jsx";
import PokemonFilteredListContext from "./Context/PokemonFilteredListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PokemonListProvider>
      <PokemonFilteredListContext>
      <App />
      </PokemonFilteredListContext>
    </PokemonListProvider>
  </StrictMode>
);
