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
  const rarity = pokemon.id % 3 === 0 ? "★" : pokemon.id % 5 === 0 ? "✦" : "●";

  // background and border classes derived from rarity
  const rarityBg =
    rarity === "★"
      ? "bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-600"
      : rarity === "✦"
      ? "bg-gradient-to-br from-indigo-200 via-violet-400 to-purple-700"
      : "bg-gradient-to-br from-slate-100 via-slate-300 to-slate-700";
  const rarityBorder =
    rarity === "★"
      ? "border-yellow-700"
      : rarity === "✦"
      ? "border-purple-700"
      : "border-slate-700";
  
  const rarityColor =
    rarity === "★"
      ? "text-yellow-600"
      : rarity === "✦"
      ? "text-purple-600"
      : "text-slate-600";
  
  const handleCardClick = () => {
    onInfoClick();
  };

  return (
    <div className="pokemon-card-wrapper" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="pokemon-card">
        {/* Front Face - Main Card */}
        <div className="pokemon-card-front">
          <div className={`h-full flex flex-col p-4 ${rarityBg} rounded-3xl relative overflow-hidden border-8 ${rarityBorder} transition-all duration-300 hover:shadow-2xl hover:scale-105`} style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)' }}>
            {/* Shine Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)' }}></div>
            
            {/* Inner Frame Border */}
            <div className="absolute inset-4 border-2 border-white border-opacity-30 rounded-2xl pointer-events-none"></div>

            {/* Corner Rarity Badge */}
            <div className={`absolute top-3 right-3 z-20 ${rarityColor} text-4xl drop-shadow-xl`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              {rarity}
            </div>
            
            {/* Header Section */}
            <div className="relative z-10 w-full mb-3 bg-white bg-opacity-90 rounded-2xl p-4 shadow-xl border-2 border-white transform hover:scale-105 transition-transform">
              <p className="text-xs font-black text-slate-600 tracking-widest mb-1 uppercase">#{pokemon.id.toString().padStart(3, "0")}</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight" style={{ letterSpacing: '0.5px' }}>
                {pokemon.name}
              </h3>
            </div>

            {/* Image Container - Premium Feel */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100 rounded-2xl mb-4 border-4 border-white shadow-xl transition-transform hover:scale-110 duration-300" style={{ boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.08)' }}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-40 h-40 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Type Badges */}
            <div className="relative z-10 flex gap-2 mb-4 flex-wrap justify-center">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`px-3 py-1.5 rounded-full text-white text-xs font-black capitalize shadow-lg border border-white border-opacity-60 transition-transform hover:scale-110 ${typeColors[type] || "bg-gray-500"}`}
                  style={{ backdropFilter: 'blur(4px)' }}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Info Button - Premium Style */}
            <button
              onClick={onInfoClick}
              className="relative z-10 w-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-black py-3 px-4 rounded-xl shadow-xl transform hover:scale-110 transition-all duration-200 active:scale-95 border-2 border-red-300 hover:border-red-200"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
            >
              ℹ️ Dettagli
            </button>
          </div>
        </div>

        {/* Back Face - Full Info */}
        <div className="pokemon-card-back">
          <div className={`h-full flex flex-col p-4 ${rarityBg} rounded-3xl relative overflow-hidden border-8 ${rarityBorder}`} style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)' }}>
            {/* Shine Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)' }}></div>
            
            {/* Inner Frame Border */}
            <div className="absolute inset-4 border-2 border-white border-opacity-30 rounded-2xl pointer-events-none"></div>

            {/* Corner Image Badge */}
            <div className="absolute top-3 right-3 z-20 bg-white rounded-full p-1.5 border-3 border-white shadow-xl">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-14 h-14 object-contain"
              />
            </div>
            
            {/* Header Back */}
            <div className="relative z-10 w-full bg-white bg-opacity-90 rounded-2xl p-4 shadow-xl border-2 border-white mb-3">
              <h4 className="text-2xl font-black text-slate-900" style={{ letterSpacing: '0.5px' }}>
                {pokemon.name}
              </h4>
              <p className="text-xs font-bold text-slate-600 mt-1 uppercase">Informazioni Completi</p>
            </div>

            {/* Stats Section - Scrollable */}
            <div className="relative z-10 flex-1 overflow-y-auto space-y-2.5 pr-2">
              {/* Physical Attributes */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white bg-opacity-90 rounded-xl p-3 text-center border-2 border-blue-400 shadow-lg transform hover:scale-105 transition-transform">
                  <p className="text-xs font-black text-slate-700 uppercase mb-1">Altezza</p>
                  <p className="text-lg font-black text-blue-700">
                    {(pokemon.height / 10).toFixed(1)}m
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl p-3 text-center border-2 border-green-400 shadow-lg transform hover:scale-105 transition-transform">
                  <p className="text-xs font-black text-slate-700 uppercase mb-1">Peso</p>
                  <p className="text-lg font-black text-green-700">
                    {(pokemon.weight / 10).toFixed(1)}kg
                  </p>
                </div>
              </div>

              {/* Stats Bars */}
              <div className="bg-white bg-opacity-90 rounded-xl p-3 border-2 border-purple-400 shadow-lg">
                <p className="text-xs font-black text-slate-800 mb-3 uppercase">Statistiche</p>
                {topStats.map((stat) => (
                  <div key={stat.name} className="mb-2.5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black text-slate-700 uppercase">
                        {stat.name}
                      </span>
                      <span className="text-xs font-black text-white bg-slate-700 px-2 py-0.5 rounded-lg">
                        {stat.value}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden border border-slate-300 shadow-sm">
                      <div
                        className={`h-full ${getStatColor(stat.value)} transition-all duration-500 rounded-full`}
                        style={{ width: `${(stat.value / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Types on Back */}
              <div className="bg-white bg-opacity-90 rounded-xl p-3 border-2 border-orange-400 shadow-lg">
                <p className="text-xs font-black text-slate-800 mb-2 uppercase">Tipi</p>
                <div className="flex gap-1.5 flex-wrap">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={`px-2.5 py-1 rounded-lg text-white text-xs font-black capitalize shadow-lg border border-white border-opacity-60 ${typeColors[type] || "bg-gray-500"}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
