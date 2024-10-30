<template>
  <h1 v-if="!getDataStoreLoading">Espere por favor....</h1>
  <article v-else class="pokeQuizz-container">
    <section class="quizz-sect">
      <div class="quizz-div">
        <header>
          <h1>¿Quién es este Pokémon?</h1>
        </header>
        <article class="quizz-art">
          <PokemonPicture class="poke-img" />
          <PokemonOptions class="poke-options" @checkAnswer="checkAnswer" />
        </article>
        <footer>
          <button class="newGame-btn" @click="newGame">Nuevo Juego</button>
        </footer>
      </div>
    </section>
    <section class="lifes-sect">
      <div class="lifes-div">
        <p class="lifes-text"><b>Vidas:</b></p>
        <img v-for="life in getPokeLifes" :key="life" class="imgPoke-life" :src="pokeBallLife" />
      </div>
    </section>

    <AgainGame v-if="getPokeLifes > 0 && getShowModal && !getAnswerCorrect" :againGame="againGame" />
    <NewGame v-else-if="getPokeLifes === 0 && getShowModal && !getAnswerCorrect" :newGame="newGame" />
    <router-view v-if="getShowModal && getAnswerCorrect && getDataStoreLoading" @startNewGame="startNewGame" />

  </article>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from 'vue-router';

import { getPokeData } from "../../../helpers/getPokeApiData.js";
import { getPokeOpt } from "../helpers/getPokeApiDataOpt.js";

import { pokeDataStore } from "../stores/quizzStore";
import PokemonPicture from "../components/PokemonPicture.vue";
import PokemonOptions from "../components/PokemonOptions.vue";
import AgainGame from "../components/AgainGame.vue";
import NewGame from "../components/NewGame.vue";
import pokeBallLife from "../assets/pokeball_life.gif";

const router = useRouter();
const store = pokeDataStore();
const getSelectedPokeID = computed(() => store.getSelectedPokeID());
const getPokeLifes = computed(() => store.getPokeLifes());
const getShowModal = computed(() => store.getShowModal());
const getAnswerCorrect = computed(() => store.getAnswerCorrect());
const getDataStoreLoading = computed(() => store.getDataStoreLoading());
const getSelectedOption = computed(() => store.getSelectedOption());

const fetchRandomPokemon = async () => {
  try {
    const pokeDataArray = await getPokeOpt();
    store.setPokeDataArray(pokeDataArray);
    const randomIndex = Math.floor(Math.random() * pokeDataArray.length);
    const pokeRamdomID = (pokeDataArray[randomIndex]).id;
    store.setSelectedPokeID(pokeRamdomID);
    fetchPokeData(pokeRamdomID);
    store.setDataStoreLoading(true);
  } catch (error) {
    console.log("Error al consumir la API getPokeOpt", error);
  }
};

const fetchPokeData = async (pokeId) => {
  try {
    const pokeData = await getPokeData(pokeId);
    store.setPokeData(pokeData);
  } catch (error) {
    console.log("Error al consumir la API getPokeData", error);    
  }
 }

const checkAnswer = async (selectedId) => {
  store.setShowPokemon(true);
  store.setIsDisabled(true);

  if (selectedId === getSelectedPokeID.value) {
    store.setShowModal(true);
    store.setAnswerCorrect(true);
    store.setSelectedOption(true);
    router.push({ name: 'description', params: { id: getSelectedPokeID.value } });
  } else {
    let minusPokeLifes = (getPokeLifes.value) - 1;
    store.setPokeLifes(minusPokeLifes);
    store.setShowModal(true);
    store.setAnswerCorrect(false);
    store.setSelectedOption(false);
  }
};

const handleSelectedQuestion = () => {
  if (getSelectedOption) {
    router.push({ name: 'description', params: { id: getSelectedPokeID.value } });
  } else {
    router.push({ name: 'quizz' });
  }
}

const againGame = () => {
  updateStatus();
  fetchRandomPokemon();
};

const newGame = () => {
  updateStatus();
  store.setPokeLifes(3);
  fetchRandomPokemon();
};

const startNewGame = () => {
  updateStatus();
  store.setPokeLifes(3);
  fetchRandomPokemon();
};

const updateStatus = () => {
  store.setShowPokemon(false);
  store.setIsDisabled(false);
  store.setAnswerCorrect(false);
  store.setShowModal(false);
  store.setSelectedOption(false);
  store.setDataStoreLoading(false);
  store.setSelectedPokeID('');
}

onMounted(() => {
  // router.push({ name: 'quizz' });
  // updateStatus();
  fetchRandomPokemon();
});

</script>

<style scoped>
@import url("../css/styles-components.css");

.pokeQuizz-container {
  display: flex;
  justify-content: center;
}

.poke-points-container {
  height: auto;
  width: auto;
}

.div-poke-points {
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  color: #000000;
  display: flex;
  flex-direction: column;
  height: auto;
  margin: auto 10px;
  padding: 10px 5px;
  width: auto;
}

.lifes-sect {
  height: auto;
  width: auto;
}

.lifes-div {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  /* border: 1px solid #000000; */
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  height: auto;
  margin: auto 10px;
  padding: 10px 5px;
  text-shadow: 5px 5px 10px rgb(0, 0, 0);
  width: auto;
}

.lifes-text {
  margin: auto;
}

.quizz-sect {
  /* background-color: rgba(255, 255, 255, 0.3); */
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  color: #000000;
  height: auto;
  left: 0;
  top: 0;
  width: auto;
}

.quizz-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  padding: 10px;
  /* position: relative; */
}

.quizz-art {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}

.poke-img {
  position: relative;
  margin: 0 auto;
}

h1 {
  top: 0;
  margin: 10px;
  padding: 00px;
  color: rgb(255, 255, 255);
  text-shadow: 5px 5px 10px rgb(0, 0, 0);
}

@media (max-width: 700px) {
  .pokeQuizz-container {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .quizz-sect {
    width: 100%;
    margin: 5px;
  }

  .lifes-sect {
    margin: 5px;
    width: auto;
  }

  .lifes-div {
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
  }
}
</style>