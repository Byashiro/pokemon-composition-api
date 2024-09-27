import axios from "axios";

const pokeApiData = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
});

const pokeApiSpecies = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon-species'
});

const pokeApiTypes = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/type'
});

const pokeApiAbilities = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/ability'
});

export { pokeApiData, pokeApiSpecies, pokeApiTypes, pokeApiAbilities }