<template>
    <section class="pokeDesc-container">
        <h4 class="pokeDesc-h4">Descripción:</h4>
        <p class="pokeDesc-p">{{ getPokeData.description }}</p>
    </section>
    <section class="wh-container">
        <div class="div-w">
            <p class="p-w"><b>Peso:</b> {{ getPokeData.weight }} kg</p>
        </div>
        <div class="div-h">
            <p class="p-h"><b>Altura:</b> {{ getPokeData.height }} m</p>
        </div>
    </section>
    <section class="pokeDesc-abilities-container">
        <div class="div-na">
            <p class="p-na"><b>Habilidad:</b></p>
            <div class="div-normalAbility" v-for="normalA in getPokeData.abilities?.normalAbility" :key="normalA">
                <p class="p-na-name" @mouseover="showDescription(normalA)" @mouseleave="hideDescription"><!--@mouseleave="hideDescription"-->
                    {{ normalA.name }}
                </p>
            </div>
        </div>

        <div class="div-ha" v-if="hiddenAbility === true">
            <p class="p-ha"><b>Habilidad oculta:</b></p>
            <div class="div-hiddenAbility" v-for="hiddenA in getPokeData.abilities?.hiddenAbility" :key="hiddenA">
                <p class="p-ha-name" @mouseover="showDescription(hiddenA)" @mouseleave="hideDescription">
                    {{ hiddenA.name }}
                </p>
            </div>
        </div>

        <Transition class="description-modal">
            <p v-if="showModalAbility"> {{ descriptionAbility }} </p>
        </Transition>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { pokeDataStore } from '../stores/quizzStore.js';

const store = pokeDataStore();
const getPokeData = computed(() => store.getPokeData());
const showModalAbility = ref(false);
const descriptionAbility = ref('');
const hiddenAbility = getPokeData.value.abilities.hiddenAbility.length > 0 ? true : false;

const showDescription = (normalA) => {
    showModalAbility.value = true;
    descriptionAbility.value = normalA.description;
};

const hideDescription = () => {
    showModalAbility.value = false;
};
</script>

<style scoped>
.pokeDesc-container {
    height: auto;
    justify-content: center;
    margin: 10px;
    width: auto;
}

.pokeDesc-h4 {
    margin: 5px 20px;
}

.pokeDesc-p {
    padding: 5px;
    margin: auto;
    text-align: left;
    width: auto;
}

.wh-container {
    display: flex;
    height: auto;
    justify-content: space-around;
    margin: 10px;
    width: auto;
}

.div-w,
.div-h {
    margin: 5px;
}

.p-w,
.p-h {
    margin: auto;
    padding: 5px;
}

.pokeDesc-abilities-container {
    /* border: 1px solid #000000; */
    display: flex;
    height: auto;
    justify-content: space-around;
    margin: 10px;
    width: auto;
}

.div-na,
.div-ha {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 5px;
}

.p-na,
.p-ha {
    margin: 0;
}

.p-na-name,
.p-ha-name {
    color: #1b61c9;
    font-weight: bold;
    margin: 0;
}

.p-na-name:hover,
.p-ha-name:hover {
    color: #000000;
    cursor: pointer;
    font-weight: bold;
}

.description-modal {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px 0 #000000;
    left: 50%;
    top: 50%;
    padding: 20px;
    position: absolute;
    transform: translate(-50%, -50%);
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.poke-evo-container {
    /* border: 1px solid #000000; */
    display: flex;
    height: auto;
    flex-flow: column;
    margin: 10px;
    width: auto;
}

.h4-evo {
    padding: 0;
    margin: 10px;
}

.div-evo-container {
    align-items: center;
    /* border: 1px solid #000000; */
    height: 100%;
    display: flex;
    justify-content: center;
    /* margin: 10px auto; */
    overflow-y: auto;
    width: 100%;
}

.tab-evo {
    align-content: center;
    /* border: 1px solid #000000; */
    /* border-collapse: collapse; */
    display: flex;
    font-size: 80%;
    /* height: 100%; */
    height: 100%;
    justify-content: center;
    margin: 0;
    /* table-layout: fixed; */
    /* width: 100%; */
    width: 100%;
}

.div-tr-evo {
    border: 1px solid #2600ff;
    height: 100%;
    justify-content: center;
    padding: 10px;
    width: 100%;
}

.tr-evo {
    align-items: center;
    border: 1px solid #000000;
    display: flex;
    /* flex-direction: column; */
    height: 100%;
    justify-content: center;
    padding: 10px;
    width: 100%;
}

.tr-firstEvo {
    align-items: center;
    border: 1px solid #a70784;
    display: flex;
    /* flex-direction: column; */
    height: 100%;
    justify-content: center;
    padding: 10px;
    width: 100%;
}

.div-baseEvoContainer-img {
    align-items: center;
    border: 1px solid #ff0000;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: auto;
    margin: 5px;
    width: auto;
}

.div-firstEvoContainer-img {
    align-items: center;
    border: 1px solid #09ff00;
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    height: auto;
    margin: 5px;
    width: auto;
}

.div-evo-img {
    align-items: center;
    /* border: 1px solid #001aff; */
    display: flex;
    height: 130px;
    justify-content: center;
    width: 130px;
}

.img-evo {
    height: auto;
    width: auto;
}

.p-evo {
    /* border: 1px solid #000000; */
    height: auto;
    margin: 3px;
    padding: 3px;
    width: auto;
}

.div-evo-container::-webkit-scrollbar {
    width: 10px;
    height: 8px;
}

.div-evo-container::-webkit-scrollbar-thumb {
    background: #888888;
    border-radius: 5px;
}

@media screen and (max-width: 700px) {
    .tr-evo {
        display: flex;
        flex-direction: column;
    }

    /* .img-evo {
    } */
}
</style>