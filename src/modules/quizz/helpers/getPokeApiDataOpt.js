import { pokeApiData } from "../../../api/pokeApiData.js";

const indexAssignment = () => {
  const indexArray = Array.from(Array(898));
  return indexArray.map((_, index) => index + 1);
};

const getPokeOpt = async () => {
  try {
    const mixArray = indexAssignment().sort(() => Math.random() - 0.5);
    const mixArrayOpt = mixArray.splice(0, 4);
    const mixPokeApiData = await Promise.all(
      mixArrayOpt.map((id) => pokeApiData.get(`/${id}`))
    );

    const mixPokeData = mixPokeApiData.map((pokeData) => ({
      id: pokeData.data.id,
      name: pokeData.data.name,
    }));

    return mixPokeData;
  } catch (error) {
    console.error("Error al consumir getPokeApiDataOpt:", error);
    return "";
  }
};

export { getPokeOpt };
