<template>
    <section class="options-container">
        <ul class="options-ul">
            <li class="options-li" v-for="pokeDataArr in pokeDataArray" :key="pokeDataArr.id"
                @click="$emit('checkAnswer', pokeDataArr.id)" :class="getIsDisabled ? 'isDisabledList' : ''">
                {{ pokeDataArr.name.toUpperCase() }}
            </li>
        </ul>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { pokeDataStore } from '../stores/quizzStore.js';

const store = pokeDataStore();
const pokeDataArray = computed(() => store.getPokeDataArray());
const getIsDisabled = computed(() => store.getIsDisabled());
</script>

<style scoped>
.options-container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: auto;
    width: auto;
}

.options-ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.options-li {
    background-color: rgba(34, 40, 49);
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: #EEEEEE;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 5px 100px;
}

.options-li:hover {
    background-color: rgb(255, 0, 0);
    box-shadow: 0 0 10px 0 rgb(255, 255, 255);
    text-shadow: 2px 2px 10px #000000 !important;
}

.isDisabledList {
    opacity: 0.5;
    pointer-events: none;
}

@media (max-width: 300px) {
    .options-li {
        padding: 5px auto;
    }
}
</style>