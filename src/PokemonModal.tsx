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

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
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

export const PokemonModal = ({ pokemon, onClose }: PokemonModalProps) => {
  const getStatColor = (value: number) => {
    if (value >= 120) return "bg-green-500";
    if (value >= 100) return "bg-blue-500";
    if (value >= 80) return "bg-purple-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="pokemon-modal-overlay" onClick={onClose}>
      <div
        className="pokemon-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-yellow-400 p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-40 h-40 bg-yellow-300 rounded-full opacity-20 -top-20 -left-20 animate-pulse"></div>
            <div className="absolute w-40 h-40 bg-red-400 rounded-full opacity-20 -bottom-20 -right-20 animate-pulse"></div>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl shadow-lg transform hover:scale-110 transition-all duration-200 z-10"
          >
            ✕
          </button>

          <div className="flex items-center gap-6 relative z-10">
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-40 h-40 object-contain drop-shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-4xl font-black text-white drop-shadow-lg mb-2">
                {pokemon.name}
              </h2>
              <p className="text-white font-bold text-lg drop-shadow mb-3">
                #{pokemon.id.toString().padStart(3, "0")}
              </p>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`px-4 py-2 rounded-full text-white font-bold capitalize shadow-lg ${typeColors[type] || "bg-gray-500"}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 bg-white overflow-y-auto max-h-96">
          {/* Physical Info */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-300">
              <p className="text-gray-600 font-bold text-sm mb-1">Altezza</p>
              <p className="text-3xl font-black text-blue-600">
                {(pokemon.height / 10).toFixed(1)}m
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-300">
              <p className="text-gray-600 font-bold text-sm mb-1">Peso</p>
              <p className="text-3xl font-black text-green-600">
                {(pokemon.weight / 10).toFixed(1)}kg
              </p>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-2xl font-black text-gray-800 mb-4">Statistiche</h3>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-700 capitalize text-sm">
                      {stat.name.replace("-", " ")}
                    </span>
                    <span className="font-bold text-gray-600 text-sm">
                      {stat.value}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300">
                    <div
                      className={`h-full ${getStatColor(stat.value)} transition-all duration-500 ease-out rounded-full`}
                      style={{ width: `${(stat.value / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 rounded-b-3xl border-t-2 border-gray-300 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
