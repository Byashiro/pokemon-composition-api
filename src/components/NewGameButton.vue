<template>
    <button class="newGame-btn" @click="$emit('closeModal', newGame)">Nuevo Juego</button>
</template>

<script setup>
import { pokeDataStore } from '../modules/quizz/stores/quizzStore';
const store = pokeDataStore();

const newGame = () => {
    store.setShowPokemon(false);
    store.setIsDisabled(false);
    store.setAnswerCorrect(false);
    store.setShowModal(false);
    store.setDataStoreLoading(false);
    store.setPokeLifes(3);
;}
</script>

<style>
@import url("../css/styles-components.css");
</style>