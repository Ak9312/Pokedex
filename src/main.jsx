import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import PokemonListProvider from "./Context/PokemonListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PokemonListProvider>
      <App />
    </PokemonListProvider>
  </StrictMode>
);
