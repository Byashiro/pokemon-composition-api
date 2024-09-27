import { defineStore } from "pinia";
import { ref } from "vue";

const pokeDataStore = defineStore("pokeData", () => {
  let pokeBgImg = ref(null);

  function setPokeBgImg(newPokeBgImg) {
    pokeBgImg.value = newPokeBgImg;
  }

  function getPokeBgImg() {
    return pokeBgImg.value;
  }

  return {
    setPokeBgImg,
    getPokeBgImg
  };
});

export { pokeDataStore };
