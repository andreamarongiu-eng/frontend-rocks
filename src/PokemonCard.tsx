interface Stat {
  name: string;
  value: number;
}

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: Stat[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onInfoClick: () => void;
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400 text-gray-800",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-blue-400",
  psychic: "bg-purple-600",
  bug: "bg-green-600",
  rock: "bg-gray-600",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-400",
};

const getStatColor = (value: number) => {
  if (value >= 120) return "bg-green-500";
  if (value >= 100) return "bg-blue-500";
  if (value >= 80) return "bg-purple-500";
  if (value >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

export const PokemonCard = ({ pokemon, onInfoClick }: PokemonCardProps) => {
  const topStats = pokemon.stats.slice(0, 3);
  const cardPrice = (pokemon.id * 1.5 + 9.99).toFixed(2);
  const coinCost = Math.floor(pokemon.id * 5 + 50);
  const hpStat = pokemon.stats.find((s) => s.name.toLowerCase() === "hp")?.value || Math.max(...pokemon.stats.map(s => s.value));
  const rarity = pokemon.id % 3 === 0 ? "★" : pokemon.id % 5 === 0 ? "✦" : "●";
  
  const handleCardClick = () => {
    onInfoClick();
  };

  return (
    <div className="pokemon-card-wrapper" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="pokemon-card">
        {/* Front Face */}
        <div className="pokemon-card-front">
          <div className="h-full flex flex-col items-center justify-between p-4 bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-2xl border-4 border-red-400 relative">
            {/* Price & Coin Tags */}
            <div className="absolute top-3 right-3 bg-yellow-300 border-2 border-red-600 rounded-lg px-2 py-1 shadow-lg">
              <p className="text-xs font-black text-red-600">€{cardPrice}</p>
            </div>
            <div className="absolute bottom-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-300 border-2 border-orange-600 rounded-full px-2 py-1 shadow-lg flex items-center gap-1">
              <span className="text-lg">🪙</span>
              <p className="text-xs font-black text-orange-800">{coinCost}</p>
            </div>
            {/* ID e Nome */}
            <div className="w-full text-center mb-2">
              <p className="text-xs font-bold text-red-600">#{pokemon.id.toString().padStart(3, "0")}</p>
              <h3 className="text-2xl font-black text-gray-800 drop-shadow-md">
                {pokemon.name}
              </h3>
              {/* Energy cost icons */}
              <div className="flex justify-center gap-1 mt-1">
                {[...Array(Math.ceil(hpStat / 30))].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full ${typeColors[pokemon.types[0]] || "bg-gray-400"}`}
                  ></span>
                ))}
              </div>
            </div>

            {/* Immagine Pokemon */}
            <div className="w-full h-40 flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-100 rounded-xl mb-3 border-2 border-blue-300 pokemon-image-container">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-32 h-32 object-contain drop-shadow-lg pokemon-image"
              />
            </div>

            {/* Types */}
            <div className="flex gap-2 mb-4 flex-wrap justify-center items-center">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`px-3 py-1 rounded-full text-white text-xs font-bold capitalize shadow-lg ${typeColors[type] || "bg-gray-500"}`}
                >
                  {type}
                </span>
              ))}
              <div className="rarity-bubble ml-2">{rarity}</div>
            </div>

            {/* Info Button */}
            <button
              onClick={onInfoClick}
              className="w-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95 border-2 border-red-700"
            >
              ℹ️ Info Pokemon
            </button>
          </div>
        </div>

        {/* Back Face - Full Info */}
        <div className="pokemon-card-back">
          <div className="h-full flex flex-col items-center justify-between p-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-2xl border-4 border-purple-700 overflow-hidden">
                        {/* Small Image Top Left */}
                        <div className="absolute top-3 left-3 bg-white rounded-lg p-1.5 border-2 border-yellow-300 shadow-lg">
                          <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
            {/* Header Back */}
            <div className="text-center mb-3 w-full mt-14">
              <h4 className="text-lg font-black text-white drop-shadow-lg">
                {pokemon.name}
              </h4>
            </div>

            {/* Physical Stats */}
            <div className="w-full grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white bg-opacity-90 rounded-lg p-2 text-center border-2 border-yellow-300">
                <p className="text-xs font-bold text-gray-700">Altezza</p>
                <p className="text-sm font-black text-blue-600">
                  {(pokemon.height / 10).toFixed(1)}m
                </p>
              </div>
              <div className="bg-white bg-opacity-90 rounded-lg p-2 text-center border-2 border-yellow-300">
                <p className="text-xs font-bold text-gray-700">Peso</p>
                <p className="text-sm font-black text-green-600">
                  {(pokemon.weight / 10).toFixed(1)}kg
                </p>
              </div>
            </div>

            {/* Top Stats */}
            <div className="w-full mb-3">
              <p className="text-xs font-bold text-white drop-shadow mb-1">Top Stats:</p>
              <div className="space-y-1 w-full">
                {topStats.map((stat) => (
                  <div key={stat.name} className="bg-white bg-opacity-80 rounded p-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-bold text-gray-700 capitalize">
                        {stat.name.substring(0, 3)}
                      </span>
                      <span className="text-xs font-bold text-gray-600">
                        {stat.value}
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-1.5 overflow-hidden border border-gray-400">
                      <div
                        className={`h-full ${getStatColor(stat.value)} transition-all duration-300`}
                        style={{ width: `${(stat.value / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Types on Back */}
            <div className="w-full">
              <div className="flex gap-1 flex-wrap justify-center">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`px-2 py-0.5 rounded-full text-white text-xs font-bold capitalize shadow ${typeColors[type] || "bg-gray-500"}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            {/* Price tag small on back */}
            <div className="price-tag-front mt-2 text-sm">€{cardPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
