<template>
  <article class="pokeData-container">
    <section class="pokeData-modal">
      <header class="pokeData-header">
      <!-- <h1>¡Felicidades, el Pokémon es <b>{{ getPokeData.name.toUpperCase() }}</b>!</h1> -->
      </header>
      <article class="pokeData-body">
        <section class="pokeData-img-container">
          <h3 class="id-name">#{{ getPokeData.id }} {{ getPokeData.name.toUpperCase() }}</h3>
          <PokemonPicture class="poke-img" />
          <h3 class="type-title">Tipo(s):</h3>
          <ul class="type-ul">
            <li v-for="(pokeType, index) in getPokeData.types" :key="index" class="type-li"
              :style="{ backgroundColor: typeColor[pokeType] }">
              {{ pokeType }}
            </li>
          </ul>
        </section>
        <section class="pokeData-info-container">
          <div class="pokeData-div-nav">
            <nav class="nav-container">
              <router-link 
                class="nav-options"
                :class="{ 'is-active': activeLink === 'description' }" 
                @click="setActiveLink('description')"
                :to="{ name: 'description', params: { id: getPokeData.id } }"
                :style="{ backgroundColor: typeColor[getPokeData.types[0]], filter: `brightness(90%)` }"
              >                
                Descripción
              </router-link>

              <router-link 
                class="nav-options"
                :class="{ 'is-active': activeLink === 'stats' }" 
                @click="setActiveLink('stats')"
                :to="{ name: 'stats', params: { id: getPokeData.id } }"
                :style="{ backgroundColor: typeColor[getPokeData.types[0]], filter: `brightness(90%)` }"
              >                
                Estadísticas
              </router-link>
            </nav>
          </div>
          <div class="nav-info-container">
            <router-view />
          </div>
        </section>
      </article>
      <footer class="pokeData-footer">
        <!-- <button class="newGame-btn" @click="newGame">Nuevo Juego</button> -->
        <button class="newGame-btn" @click="$emit('startNewGame')">Nuevo Juego</button>
        <!-- <button class="newGame-btn" @click="navigate">Nuevo Juego</button> -->
      </footer>
    </section>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { pokeDataStore } from '../stores/quizzStore.js';
import { typeColorEsp } from '../../../helpers/pokeHelpers.js';
import PokemonPicture from "../components/PokemonPicture.vue";

const store = pokeDataStore();
const getPokeData = computed(() => store.getPokeData());
const typeColor = typeColorEsp;
const activeLink = ref('description');


// const typeColorOpt = ref('');
// const router = useRouter();
// const returnPage = ref(false);

// defineProps({
//   newGame: {
//     type: Function,
//     required: true
//   }
// });

const setActiveLink = (linkName) => {
  activeLink.value = linkName
};

</script>

<style scoped>
@import url('../css/styles-components.css');

.pokeData-container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  z-index: 999;
  position: fixed;
  display: flex;
  backdrop-filter: blur(10px);
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.pokeData-modal {
  width: 80%;
  height: 80%;
  padding: 20px;
  display: block;
  overflow: auto;
  justify-content: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7);
}

h1 {
  top: 0;
  padding: 0;
  margin: 0;
  text-shadow: 0 0 0px #000000;
}

.pokeData-body {
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  width: 100%;
}

.pokeData-img-container {
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.7);
}

.id-name,
.type-title {
  margin: 10px 10px;
  text-shadow: 0 0 0px #000000;
}

.poke-img {
  position: relative;
  margin: 0 auto;
}

.type-ul {
  display: flex;
  list-style-type: none;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.type-li {
  color: #000000;
  text-shadow: 0 0 0px #000000;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  margin: 0 15px;
  border-radius: 20px;
  padding: 10px;
  width: 40%;
}

.pokeData-info-container {
  align-items: center;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 600px;
}

.pokeData-div-nav {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.7);
  margin: 20px 0px;
  width: 90%;
}

.nav-container {
  display: flex;
  overflow-x: auto;
  padding: auto;
}

.nav-options {
  color: #000000;
  padding: 20px;
  margin: auto;
  text-decoration: none;
  white-space: nowrap;
}

.nav-options:hover {
  color: #ffffff !important;
  filter: brightness(100%) !important;
  text-shadow: 2px 2px 10px #000000 !important;
}

.is-active {
  color: #ffffff !important;
  filter: brightness(100%) !important;
  text-shadow: 2px 2px 10px #000000 !important;
}

.nav-info-container {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.7);
  height: 90%;
  justify-content: center;
  margin-bottom: 20px;
  overflow-y: auto;
  width: 90%;
}

.pokeData-modal::-webkit-scrollbar,
.nav-info-container::-webkit-scrollbar,
.nav-container::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}

.pokeData-modal::-webkit-scrollbar-thumb,
.nav-info-container::-webkit-scrollbar-thumb,
.nav-container::-webkit-scrollbar-thumb {
  background: #888888;
  border-radius: 5px;
}

@media (max-width: 800px) {
  .pokeData-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    height: auto;
  }

  .pokeData-body,
  .pokeData-img-container,
  .pokeData-info-container {
    width: 100%;
  }
}
</style>