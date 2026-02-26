import { useEffect, useState } from "react";
import { PokeAPI } from "./api";
import { PokemonCard } from "./PokemonCard";
import { PokemonModal } from "./PokemonModal";

interface Stat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: Stat[];
}

export const PokemonSelector = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20); // show in blocks of 20

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        // determine total count and then fetch all entries
        const first = await PokeAPI.listPokemons(0, 1);
        const total = first.count;
        const list = await PokeAPI.listPokemons(0, total);
        const details = await Promise.all(
          list.results.map(async (p) => {
            const data = await PokeAPI.getPokemonByName(p.name);
            return transform(data);
          })
        );
        setPokemons(details);
      } catch (err) {
        console.error("error fetching pokemons", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const transform = (data: any): Pokemon => ({
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    image:
      data.sprites.other?.["official-artwork"]?.front_default ||
      data.sprites.front_default ||
      "",
    types: data.types.map((t: any) => t.type.name),
    height: data.height,
    weight: data.weight,
    stats: data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  });

  const handleInfo = (pokemon: Pokemon) => {
    setSelected(pokemon);
  };

  const handleClose = () => setSelected(null);

  return (
    <div className="pokemon-selector p-4 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
      {loading && <p className="col-span-full text-center">Caricamento...</p>}
      {pokemons.slice(0, visibleCount).map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          onInfoClick={() => handleInfo(p)}
        />
      ))}

      {visibleCount < pokemons.length && !loading && (
        <button
          onClick={() => setVisibleCount((v) => Math.min(v + 20, pokemons.length))}
          className="col-span-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Mostra altri Pokémon
        </button>
      )}

      {selected && (
        <PokemonModal pokemon={selected} onClose={handleClose} />
      )}
    </div>
  );
};
