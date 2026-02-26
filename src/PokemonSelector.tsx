import { useState, useEffect } from "react";
import { PokeAPI } from "./api";
import { PokemonCard } from "./PokemonCard";
import { PokemonModal } from "./PokemonModal";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: Array<{ name: string; value: number }>;
}

export const PokemonSelector = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        // Fetch prima 12 Pokemon
        const pokemonList = await PokeAPI.listPokemons(0, 12);
        
        const pokemonDetails = await Promise.all(
          pokemonList.results.map(async (p) => {
            const details = await PokeAPI.getPokemonByName(p.name);
            return {
              id: details.id,
              name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
              image:
                details.sprites.other?.["official-artwork"].front_default ||
                details.sprites.front_default ||
                "/pokemon.png",
              types: details.types.map((t: any) => t.type.name),
              height: details.height,
              weight: details.weight,
              stats: details.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat,
              })),
            };
          })
        );
        
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Errore nel fetch dei Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-red-100 to-blue-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-bounce-slow">
          <h1 className="text-6xl font-black text-red-600 drop-shadow-lg mb-2">
            POKÉMON SELECTOR
          </h1>
          <p className="text-2xl font-bold text-blue-700 drop-shadow">
            Gotta catch 'em all!
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block">
                <div className="w-16 h-16 border-4 border-red-500 border-t-yellow-300 rounded-full animate-spin mb-4"></div>
              </div>
              <p className="text-xl font-bold text-red-600">Caricamento Pokémon...</p>
            </div>
          </div>
        ) : (
          /* Pokemon Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onInfoClick={() => setSelectedPokemon(pokemon)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};
