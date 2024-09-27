<template>
    <div class="alert-container">
        <div class="alert-message">
            <p class="alert-text">El Pokémon era <b>{{ pokeData.name.toUpperCase() }}</b>.</p>
            <p class="alert-text">Te has quedado sin vidas.</p>
            <!-- <button class="newGame-btn" @click="$emit('closeModal')">Nuevo Juego</button> -->
            <button class="newGame-btn" @click="newGame">Otra vez</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { pokeDataStore } from '../stores/quizzStore';

const store = pokeDataStore();
const pokeData = computed(() => store.getPokeData());

defineProps({
    newGame: {
        type: Function,
        required: true
    }
});

</script>

<style scoped>
@import url('../css/styles-components.css');
</style>