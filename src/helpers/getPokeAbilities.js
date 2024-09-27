import { pokeApiAbilities } from "../api/pokeApiData.js";

const getAbilityName = async (abilitiesNames) => {
  try {
    let normalAbility = [];
    let hiddenAbility = [];

    abilitiesNames.forEach((abilityObj) => {
      if (abilityObj.is_hidden) {
        hiddenAbility.push({ name: abilityObj.ability.name });
      } else {
        normalAbility.push({ name: abilityObj.ability.name });
      }
    });

    const getAbilityNameEs = async (abilityNameEn) => {
      try {
        const respPokeAbility = await pokeApiAbilities.get(`/${abilityNameEn}`);
        const pokeDataAbility = await respPokeAbility.data;
        console.log("valor pokeApiAbilities.data:", pokeDataAbility);
        const abilityNameEs = pokeDataAbility.names[5].name;
        const flavorTextEntriesEs = pokeDataAbility.flavor_text_entries.filter((entry) => entry.language.name === "es");

        // Valida si existe traducción en español de la abilidad, sino, obtiene la traducción en ingles
        if (flavorTextEntriesEs.length > 0) {
          return {
            name: abilityNameEs,
            description: flavorTextEntriesEs[0].flavor_text
          };
        } else {
          const flavorTextEntriesEn = pokeDataAbility.flavor_text_entries.filter((entry) => entry.language.name === "en");
          return {
            name: abilityNameEn,
            description: flavorTextEntriesEn[0].flavor_text,
          };
        }
      } catch (error) {
        console.error("Error al obtener la descripción de la habilidad:", error);
        return "";        
      }
    }

    if (normalAbility.length > 1) {
      for (let i = 0; i < normalAbility.length; i++) {
        const abilityName = await getAbilityNameEs(normalAbility[i].name);
        normalAbility[i].name = abilityName;
      }
    } else {
      const abilityName = await getAbilityNameEs(normalAbility[0].name);
      normalAbility[0].name = abilityName;
    }

    if (hiddenAbility.length === 0) {
      hiddenAbility = [];
    } else {
      if (hiddenAbility.length > 1) {
        for (let i = 0; i < hiddenAbility.length; i++) {
          const abilityName = await getAbilityNameEs(hiddenAbility[i].name);
          hiddenAbility[i].name = abilityName;
        }
      } else {
        const abilityName = await getAbilityNameEs(hiddenAbility[0].name);
        hiddenAbility[0].name = abilityName;
      }
    }

    const abilities = {
      normal: normalAbility.map((abilityObject) => abilityObject.name),
      hidden: hiddenAbility.map((abilityObject) => abilityObject.name),
    };

    console.log(abilities);

  } catch (error) {
    console.error("Error al obtener la traducción de la habilidad:", error);
    return "";
  }
};

export { getAbilityName };