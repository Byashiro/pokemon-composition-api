<template>
    <figure class="figure-container">
        <img :src="pokeImg" class="hidden-img" alt="pokemon">
        <img v-if="getShowPokemon" :src="pokeImg" class="fade-in" alt="pokemon">
    </figure>
</template>

<script setup>
import { computed } from 'vue';
import { pokeDataStore } from '../stores/quizzStore.js';

const store = pokeDataStore();
const pokeID = computed(() => store.getSelectedPokeID());
const getShowPokemon = computed(() => store.getShowPokemon());

const pokeImg = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID.value}.png`;
});

</script>

<style scoped>
.figure-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 250px;
    justify-content: center;
    width: 250px;
}

img {
    height: 100%;
    width: 100%;
    margin: auto;
    position: absolute;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    cursor: pointer;
}

.hidden-img {
    filter: brightness(0);
}
</style>