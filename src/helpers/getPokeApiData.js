import {
  pokeApiData,
  pokeApiSpecies,
  pokeApiAbility,
} from "../api/pokeApiData.js";

import { typeNameEs, pokedexEs, statsEs } from "./pokeHelpers.js";
import { getPokeWeakness } from '../helpers/getPokeWeakness.js';

const getPokeData = async (id) => {
  try {
    const pokeDesc = (await pokeApiSpecies.get(`${id}`)).data;
    let flavorText = {};

    const flavorTextArr = pokeDesc.flavor_text_entries.map(
      (flavorTextArrEs) => flavorTextArrEs.language.name
    );
    const existEs = flavorTextArr.some((language) => language === "es");

    if ( existEs ) {
      const findFlavorTextEs = pokeDesc.flavor_text_entries.filter(
        (entry) => entry.language.name === "es"
      );
      flavorText = findFlavorTextEs[findFlavorTextEs.length - 1].flavor_text;
    } else {
      const findFlavorTextEn = pokeDesc.flavor_text_entries.filter(
        (entry) => entry.language.name === "en"
      );
      flavorText = findFlavorTextEn[findFlavorTextEn.length - 1].flavor_text;
    }

    const pokedex = pokeDesc.pokedex_numbers.map((pokedexObj) => ({
      number: pokedexObj.entry_number,
      region: pokedexEs[pokedexObj.pokedex.name],
    }));

    const pokeData = (await pokeApiData.get(`${id}`)).data;
    let abilityName = "";
    let descriptionAbility = {};
    let pokeDataAbility = {};
    let normalAbility = [];
    let hiddenAbility = [];

    const getPokeDataEs = async (abilityEn) => {
      const pokeAbility = (await pokeApiAbility.get(`/${abilityEn}`)).data;
      let abilityNameArr = pokeAbility.flavor_text_entries.map(
        (abilityNameArrEs) => abilityNameArrEs.language.name
      );
      const existAbilityNameEs = abilityNameArr.some(
        (language) => language === "es"
      );

      if (existAbilityNameEs) {
        const findNameEs = pokeAbility.names.filter(
          (entry) => entry.language.name === "es"
        );
        abilityName = findNameEs[0].name;
      } else {
        abilityName = pokeAbility.name;
      }

      const flavorTextArr = pokeAbility.flavor_text_entries.map(
        (flavorTextArrEs) => flavorTextArrEs.language.name
      );
      const existAbilityEs = flavorTextArr.some(
        (language) => language === "es"
      );

      if (existAbilityEs) {
        const findFlavorTextEs = pokeAbility.flavor_text_entries.filter(
          (entry) => entry.language.name === "es"
        );
        descriptionAbility = findFlavorTextEs[findFlavorTextEs.length - 1].flavor_text;
      } else {
        const findFlavorTextEn = pokeAbility.flavor_text_entries.filter(
          (entry) => entry.language.name === "en"
        );
        descriptionAbility = findFlavorTextEn[findFlavorTextEn.length - 1].flavor_text;
      }

      return (pokeDataAbility = {
        name: abilityName,
        description: descriptionAbility,
      });
    };

    pokeData.abilities.forEach(async (abilityObj) => {
      let abilityEn = abilityObj.ability.name;
      let pokeDataAbilities = await getPokeDataEs(abilityEn);

      if (abilityObj.is_hidden) {
        hiddenAbility.push(pokeDataAbilities);
      } else {
        normalAbility.push(pokeDataAbilities);
      }
    });

    let abilities = {
      normalAbility,
      hiddenAbility,
    };

    const stats = pokeData.stats.map((statObj) => {
      const statsNamesEsp = statsEs[statObj.stat.name];
      return {
        name: statsNamesEsp,
        stat: statObj.base_stat
        // [statsNamesEsp]: statObj.base_stat,
      };
    });

    // Se ejecuta getPokeWeakness para obtener las debilidades del pokemon
    const types = pokeData.types.map((typesObj) => typesObj.type.name);
    const weaknesses = await getPokeWeakness(types);

    const traslateTypeWeakness = (types) => {
      return types.map(type => typeNameEs[type] || type);
    }

    const translateObject = (obj) => {
      for ( const category in obj ) {
        for ( const element of obj[category] ) {
          element.types = traslateTypeWeakness(element.types);
        }
      }
      return obj;
    }

    const weaknessesEs = translateObject(weaknesses);

    const typeEs = pokeData.types.map((typeObj) => {
      const typeNameEsp = typeNameEs[typeObj.type.name];
      return typeNameEsp;
    });

    const pokeDataObj = {
      id: pokeData.id,
      name: pokeData.name,
      pokedex: pokedex,
      abilities: abilities,
      description: flavorText,
      audio: pokeData.cries.latest,
      generation: pokeDesc.generation.name,
      evoChain: pokeDesc.evolution_chain.url,
      sprites: pokeData.sprites.other["official-artwork"],
      height: (pokeData.height / 10).toString().replace(".", ","),
      weight: (pokeData.weight / 10).toString().replace(".", ","),
      stats: stats,
      types: typeEs,
      weaknesses: weaknessesEs
    };

    // #CL
    // console.log(pokeDataObj);

    return pokeDataObj;
  } catch (error) {
    console.error("Error al consumir getPokeApiData:", error);
    return "";
  }
};

export { getPokeData };
