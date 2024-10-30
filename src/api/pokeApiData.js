import axios from "axios";

const pokeApiData = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

const pokeApiSpecies = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon-species",
});

const pokeApiTypes = axios.create({
  baseURL: "https://pokeapi.co/api/v2/type",
});

const pokeApiAbility = axios.create({
  baseURL: "https://pokeapi.co/api/v2/ability",
});

const pokeGenerations = axios.create({
  baseURL: "https://pokeapi.co/api/v2/generation",
});

const pokeEvoTrigger = axios.create({
  baseURL: "https://pokeapi.co/api/v2/evolution-trigger",
});

const pokeItems = axios.create({
  baseURL: "https://pokeapi.co/api/v2/item",
});

const pokeMoves = axios.create({
  baseURL: "https://pokeapi.co/api/v2/move",
});

export {
  pokeApiData,
  pokeApiSpecies,
  pokeApiTypes,
  pokeApiAbility,
  pokeGenerations,
  pokeEvoTrigger,
  pokeItems,
  pokeMoves,
};
