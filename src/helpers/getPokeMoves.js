import { pokeMoves } from "../api/pokeApiData.js";

const getPokeMoves = async () => {
    const pokeMove = (await pokeMoves.get(`${id}`)).data;
    console.log(pokeMove);
}

export { getPokeMoves };
