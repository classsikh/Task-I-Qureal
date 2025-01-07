import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPokemons = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
  return response.data.results;
};

export const usePokemons = () => {
  return useQuery({
    queryKey: ["pokemons"], 
    queryFn: fetchPokemons, 
  });
};
