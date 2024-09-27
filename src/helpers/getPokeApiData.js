import { pokeApiData, pokeApiSpecies } from '../api/pokeApiData.js'

const indexAssignment = () => {
    const indexArray = Array.from(Array(898));
    return indexArray.map((_, index) => index + 1);
}

const getPokeOptions = async() => {
    const mixArray = indexAssignment().sort(() => Math.random() - 0.5);
    const mixArrayOpt = mixArray.splice(0,4);
    const mixPokeApiData = await Promise.all(mixArrayOpt.map((id) => pokeApiData.get(`/${id}`)));
    const pokeDataDescription = await Promise.all(mixArrayOpt.map((id) => pokeApiSpecies.get(`/${id}`)));

    const pokeDataOpt = mixPokeApiData.map((poke) => {
        const matchingDesc = pokeDataDescription.find((dataDesc) => dataDesc.data.id === poke.data.id);

        const pokeDesc = matchingDesc ? {
            evoChain: matchingDesc.data.evolution_chain.url,
            generation: matchingDesc.data.generation.name,
            description: matchingDesc.data.flavor_text_entries.find((entry) => entry.language.name === "es").flavor_text,
            pokedex: matchingDesc.data.pokedex_numbers.map((pokedex) => ({
                number: pokedex.entry_number,
                name: pokedex.pokedex.name
            }))
        } : {};

        return {
            id: poke.data.id,
            name: poke.data.name,
            audio: poke.data.cries.latest,
            types: poke.data.types.map((type) => type.type.name),
            abilities: poke.data.abilities.map((ability) => ability.ability.name),
            dataSpecies: pokeDesc,
            sprites: poke.data.sprites.other['official-artwork']
        };
    });

    // console.log(pokeDataOpt);
    return pokeDataOpt;
}

export { getPokeOptions }