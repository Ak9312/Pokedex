import { pokemonTypeColorScheme } from "../../utilities/PokemonTypeColorScheme";

const ProgressBar = ({ value, max, label, primaryType }) => {
  // Calculate the percentage of progress
  const progress = Math.min((value / max) * 100, 100);

  // Get the theme color based on the primaryType
  const themeColor = pokemonTypeColorScheme[primaryType]?.bg;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs md:text-sm font-bold">{label}</p>
      </div>
      <div className={`w-full h-2  rounded-lg overflow-hidden`}>
        <div
          className={`h-full ${themeColor} opacity-100 transition-all duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
