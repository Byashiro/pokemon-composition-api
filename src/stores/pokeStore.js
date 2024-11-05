import { defineStore } from "pinia";
import { ref } from "vue";

const pokeDataStore = defineStore("pokeData", () => {
  let pokeData = ref({});
  let selectedPokeID = ref(null);
  let dataStoreLoading = ref(false);
  let showPokemon = ref(false);
  let isDisabled = ref(false);
  let showModal = ref(false);


  function setPokeData(newPokeData) {
    pokeData.value = newPokeData;
  }

  function getPokeData() {
    return pokeData.value;
  }

  function setSelectedPokeID(newPokeID) {
    selectedPokeID.value = newPokeID;
  }

  function getSelectedPokeID() {
    return selectedPokeID.value;
  }

  function setDataStoreLoading(newDataStoreLoading) {
    dataStoreLoading.value = newDataStoreLoading;
  }

  function getDataStoreLoading() {
    return dataStoreLoading.value;
  }

  function setShowPokemon(newShowPokemon) {
    showPokemon.value = newShowPokemon;
  }

  function getShowPokemon() {
    return showPokemon.value;
  }

  function setIsDisabled(newIsDisabled) {
    isDisabled.value = newIsDisabled;
  }

  function getIsDisabled() {
    return isDisabled.value;
  }

  function setShowModal(newShowModal) {
    showModal.value = newShowModal;
  }

  function getShowModal() {
    return showModal.value;
  }

  return {
    setPokeData,
    getPokeData,
    setSelectedPokeID,
    getSelectedPokeID,
    setDataStoreLoading,
    getDataStoreLoading,
    setShowPokemon,
    getShowPokemon,
    setIsDisabled,
    getIsDisabled,
    setShowModal,
    getShowModal
  }
});

export { pokeDataStore };