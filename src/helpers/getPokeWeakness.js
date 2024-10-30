import { pokeApiTypes } from "../api/pokeApiData.js";

const getPokeWeakness = async (pokeTypes) => {
  try {
    const damageRelationsObj = [];
    // Construye un arreglo con todos los tipos existente
    const allTypes = [
      "normal",
      "fighting",
      "flying",
      "poison",
      "ground",
      "rock",
      "bug",
      "ghost",
      "steel",
      "fire",
      "water",
      "grass",
      "electric",
      "psychic",
      "ice",
      "dragon",
      "dark",
      "fairy",
    ];
    // Recorre los "pokeTypes" que recibe la funcion
    // Ejecuta la api "pokeApiTypes" de cada tipo
    // Si existe información de la api, crea el objeto typeDmgObj
    // y mapea los datos de "double_dmg_from", "half_dmg_from" y "no_dmg_from"
    // guarda el objeto en "damageRelationsObj"
    for ( const typeObj of pokeTypes ) {
      const pokeTypesWkns = (await pokeApiTypes.get(`/${typeObj}`)).data.damage_relations;
      if ( pokeTypesWkns ) {
        const typeDmgObj = {
          double_dmg_from: pokeTypesWkns.double_damage_from?.map((obj) => obj.name) || [],
          half_dmg_from: pokeTypesWkns.half_damage_from?.map((obj) => obj.name) || [],
          no_dmg_from: pokeTypesWkns.no_damage_from?.map((obj) => obj.name) || [],
          quadruple_dmg_from: [],
          super_resistance_to: [],
          normal_dmg: [],
        };
        damageRelationsObj.push(typeDmgObj);
      }
    }

    // Valida si el pokemon tiene un solo tipo o dos
    if ( damageRelationsObj.length === 1 ) {
      const typeDmg = damageRelationsObj[0];

      // Valida que "typeDmg.half_dmg_from" no existan tipos o si.
      // Si no existen tipos, añade type: ["Ninguno"]
      // Si existen tipos, mapea cada uno de los tipos y los añade a "types"
      if ( typeDmg.double_dmg_from.length === 0 ) {
        typeDmg.double_dmg_from = [
          {
            percentage_dmg: "x2",
            description_dmg: "Débil a:",
            types: ["Ninguno"],
          },
        ];
      } else {
        typeDmg.double_dmg_from = [
          {
            percentage_dmg: "x2",
            description_dmg: "Débil a:",
            types: typeDmg.double_dmg_from.map((type) => type),
          },
        ];
      }

      // Valida que "typeDmg.half_dmg_from" no existan tipos o si.
      // Si no existen tipos, añade type: ["Ninguno"]
      // Si existen tipos, mapea cada uno de los tipos y los añade a "types"
      if (typeDmg.half_dmg_from.length === 0) {
        typeDmg.half_dmg_from = [
          {
            percentage_dmg: "x0.50",
            description_dmg: "Resistente a:",
            types: ["Ninguno"],
          },
        ];
      } else {
        typeDmg.half_dmg_from = [
          {
            percentage_dmg: "x0.50",
            description_dmg: "Resistente a:",
            types: typeDmg.half_dmg_from.map((type) => type),
          },
        ];
      }

      // Valida que "typeDmg.no_dmg_from" no existan tipos o si.
      // Si no existen tipos, añade type: ["Ninguno"]
      // Si existen tipos, mapea cada uno de los tipos y los añade a "types"
      if (typeDmg.no_dmg_from.length === 0) {
        typeDmg.no_dmg_from = [
          {
            percentage_dmg: "x0",
            description_dmg: "Inmune a:",
            types: ["Ninguno"],
          },
        ];
      } else {
        typeDmg.no_dmg_from = typeDmg.no_dmg_from.map((type) => ({
          percentage_dmg: "x0",
          description_dmg: "Inmune a:",
          types: [type],
        }));
      }

      // Como el pokémon solo tiene un tipo, no tiene debilidades cuadruples (x4)
      typeDmg.quadruple_dmg_from = [
        {
          percentage_dmg: "x4",
          description_dmg: "Superdébil a:",
          types: ["Ninguno"],
        },
      ];

      // Como el pokémon solo tiene un tipo, no tiene super resistencias (x0.25)
      typeDmg.super_resistance_to = [
        {
          percentage_dmg: "x0.25",
          description_dmg: "Superresistente a:",
          types: ["Ninguno"],
        },
      ];

      // Crea estructura de los daños normales "normal_dmg"
      typeDmg.normal_dmg = [
        {
          percentage_dmg: "x1",
          description_dmg: "Daño Normal:",
          types: [],
        },
      ];

      // Recorre el array "allTypes" donde estan todos los tipos
      // Después, busca los tipos que no coincidan con los tipos
      // que existen en las propiedades "double_dmg_from", "half_dmg_from" y "no_dmg_from"
      // Y los añade a la propiedad "normal_dmg"
      for (const type of allTypes) {
        if (
          !typeDmg.double_dmg_from.find((item) => item.types.includes(type)) &&
          !typeDmg.half_dmg_from.find((item) => item.types.includes(type)) &&
          !typeDmg.no_dmg_from.find((item) => item.types.includes(type))
        ) {
          typeDmg.normal_dmg[0].types.push(type);
        }
      }

      return typeDmg;

    } else {
      // Crea dos instancia ("A" y "B") para cada tipo diferente
      const typeDmgA = damageRelationsObj[0];
      const typeDmgB = damageRelationsObj[1];

      // Crea la estructura del resultado que devolvera
      let result = {
        double_dmg_from: [
          {
            percentage_dmg: "x2",
            description_dmg: "Débil a:",
            types: [],
          },
        ],
        half_dmg_from: [
          {
            percentage_dmg: "x0.50",
            description_dmg: "Resistente a:",
            types: [],
          },
        ],
        no_dmg_from: [
          {
            percentage_dmg: "x0",
            description_dmg: "Inmune a:",
            types: [],
          },
        ],
        quadruple_dmg_from: [
          {
            percentage_dmg: "x4",
            description_dmg: "Superdébil a:",
            types: [],
          },
        ],
        super_resistance_to: [
          {
            percentage_dmg: "x0.25",
            description_dmg: "Superresistente a:",
            types: [],
          },
        ],
        normal_dmg: [
          {
            percentage_dmg: "x1",
            description_dmg: "Daño normal:",
            types: [],
          },
        ],
      };

      // 1. Crea el procedimiento para obtener "quadruple_dmg_from" (las debilidades x4)

      // Filtra los tipos que coincidan entre "typeDmgA" y "typeDmB" 
      // de "double_dmg_from" y los añade a "superEffectiveType"
      const superEffectiveType = typeDmgA.double_dmg_from.filter((type) =>
        typeDmgB.double_dmg_from.includes(type)
      );

      // Agrega los tipos filtrados de "superEffectiveType" a "quadruple_dmg_from"
      result.quadruple_dmg_from[0].types.push(...superEffectiveType);
      // Vacia o añade un array vacio a "double_dmg_from"
      result.double_dmg_from = [];

      // Filtra los tipos que existan en "double_dmg_from" de "typeDmgA"
      // pero solo aquellos tipos que no existen en "half_dmg_from", no_dmg_from
      // de "typeDmgB" y que no existan en "superEffectiveType"
      // y los añade a "filterDoubleTypeDmgA"
      const filterDoubleTypeDmgA = typeDmgA.double_dmg_from.filter((type) =>
        !typeDmgB.half_dmg_from.includes(type) &&
        !typeDmgB.no_dmg_from.includes(type) &&
        !superEffectiveType.includes(type)
      );

      // Filtra los tipos que existan en "double_dmg_from" de "typeDmgB"
      // pero solo aquellos tipos que no existen en half_dmg_from", "no_dmg_from"
      // de "typeDmgA" y que no existan en "superEffectiveType"
      // y los añade a "filterDoubleTypeDmgB"
      const filterDoubleTypeDmgB = typeDmgB.double_dmg_from.filter((type) => 
        !typeDmgA.half_dmg_from.includes(type) &&
        !typeDmgA.no_dmg_from.includes(type) &&
        !superEffectiveType.includes(type)
      );

      // Combina los arrays de "filterDoubleTypeDmgA" y "filterDoubleTypeDmgB" 
      // expandiendo los elementos de cada array con "..."
      // y los agrega a "combineDoubleDmgTypes" 
      const combineDoubleDmgTypes = [
        ...filterDoubleTypeDmgA,
        ...filterDoubleTypeDmgB,
      ];

      // Agrega la estructura y los tipos filtrados del
      // array combinado "combineDoubleDmgTypes" a "double_dmg_from"
      result.double_dmg_from.push({
        percentage_dmg: "x2",
        description_dmg: "Débil a:",
        types: combineDoubleDmgTypes,
      });

      // 2. Crea el procedimiento para obtener "super_resistance_to" (las resistencias x0.25)

      // Filtra los tipos que coincidan entre "typeDmgA" y "typeDmB" 
      // de "half_dmg_from" y los añade a "superResistantType"
      const superResistantType = typeDmgA.half_dmg_from.filter((type) =>
        typeDmgB.half_dmg_from.includes(type)
      );

      // Agrega los tipos filtrados de "superResistantType" a "super_resistance_to"
      result.super_resistance_to[0].types.push(...superResistantType);
      // Vacia o agrega un array vacio a "half_dmg_from"
      result.half_dmg_from = [];

      // Filtra los tipos que existan en "half_dmg_from" de "typeDmgA"
      // pero solo aquellos tipos que no existan en "double_dmg_from", "half_dmg_from",
      // "no_dmg_from" de "typeDmgB" y que no existan en "superEffectiveType"
      // y los añade a "filterHalfTypeDmgA"
      const filterHalfTypeDmgA = typeDmgA.half_dmg_from.filter((type) =>
        !typeDmgB.double_dmg_from.includes(type) &&
        !typeDmgB.half_dmg_from.includes(type) &&
        !typeDmgB.no_dmg_from.includes(type) &&
        !superEffectiveType.includes(type)
      );

      // Filtra los tipos que existan en "half_dmg_from" de "typeDmgB"
      // pero solo aquellos tipos que no existan en "double_dmg_from", "half_dmg_from",
      // "no_dmg_from" de "typeDmgA" y que no existan en "superEffectiveType"
      // y los añade a "filterHalfTypeDmgA"
      const filterHalfTypeDmgB = typeDmgB.half_dmg_from.filter((type) =>
        !typeDmgA.double_dmg_from.includes(type) &&
        !typeDmgA.half_dmg_from.includes(type) &&
        !typeDmgA.no_dmg_from.includes(type) &&
        !superEffectiveType.includes(type)
      );

      // Combina los arrays de "filterHalfTypeDmgA" y "filterHalfTypeDmgB" 
      // expandiendo los elementos de cada array con "..."
      // y los agrega a "combineHalfDmgTypes"
      const combineHalfDmgTypes = [
        ...filterHalfTypeDmgA,
        ...filterHalfTypeDmgB,
      ];

      // Agrega la estructura y los tipos filtrados del
      // array combinado "combineHalfDmgTypes" a "half_dmg_from"
      result.half_dmg_from.push({
        percentage_dmg: "x0.50",
        description_dmg: "Resistente a:",
        types: combineHalfDmgTypes,
      });

      // 3. Crea el procedimiento para obtener "half_dmg_from" (las resistencias x0.50)

      // Filtra los tipos que existan en "half_dmg_from" de "typeDmgA"
      // pero solo aquellos tipos que no existen en "double_dmg_from", no_dmg_from de "typeDmgB"
      // "normal_dmg", "half_dmg_from", "quadruple_dmg_from" y "super_resistance_to"
      // y los añade a "exclusiveResistancesA"
      const exclusiveResistancesA = typeDmgA.half_dmg_from.filter((type) =>
        !typeDmgB.double_dmg_from.includes(type) &&
        // !typeDmgB.half_dmg_from.includes(type) &&
        !typeDmgB.no_dmg_from.includes(type) &&
        !result.normal_dmg[0].types.includes(type) &&
        !result.half_dmg_from[0].types.includes(type) &&
        !result.quadruple_dmg_from[0].types.includes(type) &&
        !result.super_resistance_to[0].types.includes(type)
      );

      // Filtra los tipos que existan en "half_dmg_from" de "typeDmgB"
      // pero solo aquellos tipos que no existen en "double_dmg_from", no_dmg_from de "typeDmgA"
      // "normal_dmg", "half_dmg_from", "quadruple_dmg_from" y "super_resistance_to"
      // y los añade a "exclusiveResistancesB"
      const exclusiveResistancesB = typeDmgB.half_dmg_from.filter((type) =>
        !typeDmgA.double_dmg_from.includes(type) &&
        // !typeDmgA.half_dmg_from.includes(type) &&
        !typeDmgA.no_dmg_from.includes(type) &&
        !result.normal_dmg[0].types.includes(type) &&
        !result.half_dmg_from[0].types.includes(type) &&
        !result.quadruple_dmg_from[0].types.includes(type) &&
        !result.super_resistance_to[0].types.includes(type)
      );

      // Agrega los arrays "exclusiveResistancesA" y "exclusiveResistancesB" 
      // a "half_dmg_from"
      result.half_dmg_from[0].types.push(
        ...exclusiveResistancesA,
        ...exclusiveResistancesB
      );

      // 4. Crea el procedimiento para obtener "no_dmg_from" (las inmunidades x0) 

      // Crea un nuevo array combinando los elementos de los arrays
      // "typeDmgA.no_dmg_from" y "typeDmgB.no_dmg_from"
      // y el nuevo array se convierte en un "Set" que es una estructura
      // de datos que almacena elementos únicos, eliminando los duplicados
      result.no_dmg_from[0].types = [
        ...new Set([...typeDmgA.no_dmg_from, ...typeDmgB.no_dmg_from]),
      ];

      // Actualiza los tipos de "half_dmg_from" filtrando aquellos tipos de
      // "half_dmg_from" donde no existan los tipos en "no_dmg_from"
      result.half_dmg_from = result.half_dmg_from.filter(
        (type) => !result.no_dmg_from.includes(type)
      );  

      // 5. Crea el procedimiento para obtener "normal_dmg" (los daños normales -)

      // Filtra los tipos que existen en "allTypes" pero solo aquellos
      // tipos que no existan en "double_dmg_from", "half_dmg_from",
      // "no_dmg_from", "quadruple_dmg_from" y "super_resistance_to"
      // y los agrega a "normal_dmg"
      result.normal_dmg[0].types = allTypes.filter((type) =>
        !result.double_dmg_from[0].types.includes(type) &&
        !result.half_dmg_from[0].types.includes(type) &&
        !result.no_dmg_from[0].types.includes(type) &&
        !result.quadruple_dmg_from[0].types.includes(type) &&
        !result.super_resistance_to[0].types.includes(type)
      );

      // El primer for recorre cada uno de los tipos de daños: "double_dmg_from", "half_dmg_from", 
      // "no_dmg_from", "quadruple_dmg_from", "super_resistance_to" y "normal_dmg"
      // de "result" y guarda en "damageCategory" cada uno de los elementos respectivamente
      // El segundo for recorre cada uno de los elementos de "damageCategory"
      // y si no existen elementos dentre de "types", agrega "Ninguno".
      for ( const damageType in result ) {
        const damageCategory = result[damageType];
        for ( const element of damageCategory ) {
          if ( element.types.length === 0 ) {
            element.types.push("Ninguno");
          }
        }
      }
      
      return result;

    }
  } catch (error) {
    console.error("Error al consumir getPokeWeakness:", error);
    return "";
  }
};

export { getPokeWeakness };
