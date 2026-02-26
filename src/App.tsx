import { useParams } from "react-router";
import { PokemonSelector } from "./PokemonSelector";

export const Detail = () => {
  const { id } = useParams();
  return <div className="text-6xl">Dettaglio: {id}</div>;
};

export const App = () => {
  return <PokemonSelector />;
};
