<template>
  <section class="app-container" :style="{ backgroundImage: `url(${refBgImage})` }">
      <router-view />
  </section>
</template>

<script setup>
  import { ref, onMounted, computed, watchEffect, onUnmounted } from "vue";
  import { getConvertTime } from './helpers/getConvertTime';
  import bgPokeSunrise from './assets/bg-poke-sunrise.jpg';
  import bgPokeDay from './assets/bg-poke-day.png';
  import bgPokeSunset from './assets/bg-poke-sunset.png';
  import bgPokeNight from './assets/bg-poke-night.png';
  import { v4 as uuidv4 } from "uuid";
  import { userStore } from './stores/userStore';

  let uStore = userStore();
  let userId = sessionStorage.getItem('userId');

  if (!userId) {
    userId = (uuidv4()).substring(0, 13);
    sessionStorage.setItem('userId', userId);
  }

  uStore.initializeUser(userId);

  // uStore.updateUserData(userId, {
  //   typeModule: 'quizz',
  //   gamePoints: 1
  // });

  const currentUserData = uStore.getUserData(userId);
  console.log("currentUserData: ", currentUserData);

  
  // console.log("userId: ", userId);
  // const getUserStore = computed(() => store.getUserStore());

  let refTime = ref(getConvertTime());
  let imgValue = ref();

  const refBgImage = computed(() => {
    if ( refTime.value >= 21600 && refTime.value <= 36000 ) {
      return imgValue.value = bgPokeSunrise;
    } else if ( refTime.value >= 36001 && refTime.value <= 61200 ) {
      return imgValue.value = bgPokeDay;
    } else if ( refTime.value >= 61201 && refTime.value <= 72000 ) {
      return imgValue.value = bgPokeSunset;
    } else {
      return imgValue.value = bgPokeNight;
    }
  });

  watchEffect(() => {
    const interval = setInterval(() => {
      refTime.value = getConvertTime();
    }, 1000);
    onUnmounted(() => clearInterval(interval));
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .app-container {
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    justify-content: center;
    margin: 0;
    display: flex;
    height: 100vh;
    width: 100%;
  }
  .div-time {
    /* border: 1px solid #000000; */
    color: #ffffff;
  }
</style>