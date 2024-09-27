import { pokeApiData } from '../../../api/pokeApiData.js';

const indexAssignment = () => {
    const indexArray = Array.from(Array(898));
    return indexArray.map((_, index) => index + 1);
}

const getPokeOpt = async () => {
    const mixArray = indexAssignment().sort(() => Math.random() - 0.5);
    const mixArrayOpt = mixArray.splice(0, 4);
    const mixPokeApiData = await Promise.all(mixArrayOpt.map((id) => pokeApiData.get(`/${id}`)));
    
    const mixPokeData = mixPokeApiData.map((pokeData) => ({
      id: pokeData.data.id,
      name: pokeData.data.name,    
      audio: pokeData.data.cries.latest
    }));

    console.log(mixPokeData);
  
    return mixPokeData;
  };

  export { getPokeOpt }