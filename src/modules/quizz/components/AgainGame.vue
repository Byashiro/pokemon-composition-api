<template>
    <div class="alert-container">
        <div class="alert-message">
            <p class="alert-text">Oppps, el Pokémon era <b>{{ pokeData.name.toUpperCase() }}</b>.</p>
            <!-- <button class="newGame-btn" @click="$emit('closeModal')">Otra vez</button> -->
            <button class="newGame-btn" @click="againGame">Otra vez</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { pokeDataStore } from '../stores/quizzStore';

const store = pokeDataStore();
const pokeData = computed(() => store.getPokeData());

defineProps({
    againGame: {
        type: Function,
        required: true
    }
});

</script>

<style>
@import url('../css/styles-components.css');
</style>