import { defineStore } from "pinia";
import { ref } from "vue";

const pokeDataStore = defineStore("pokeData", () => {
  let pokeDataArray = ref({});
  let pokeData = ref({});
  let selectedPokeID = ref(null);
  let dataStoreLoading = ref(false);
  let showPokemon = ref(false);
  let isDisabled = ref(false);
  let answerCorrect = ref(false);
  let showModal = ref(false);
  let pokeLifes = ref(3);
  let selectedOption = ref(false);
  

  function setPokeDataArray(newPokeDataArray) {
    pokeDataArray.value = newPokeDataArray;
  }

  function getPokeDataArray() {
    return pokeDataArray.value;
  }

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

  function setAnswerCorrect(newAnswerCorrect) {
    answerCorrect.value = newAnswerCorrect;
  }

  function getAnswerCorrect() {
    return answerCorrect.value;
  }

  function setShowModal(newShowModal) {
    showModal.value = newShowModal;
  }

  function getShowModal() {
    return showModal.value;
  }

  function setPokeLifes(newPokeLifes) {
    pokeLifes.value = newPokeLifes;
  }

  function getPokeLifes() {
    return pokeLifes.value;
  }

  function setSelectedOption(newSelectedOption) {
    selectedOption.value = newSelectedOption;
  }

  function getSelectedOption() {
    return selectedOption.value;
  }

  return {
    setPokeDataArray,
    getPokeDataArray,
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
    setAnswerCorrect,
    getAnswerCorrect,
    setShowModal,
    getShowModal,
    setPokeLifes,
    getPokeLifes,
    setSelectedOption,
    getSelectedOption
  };
});

export { pokeDataStore };