<template>
    <section class="pokeStats-container">
        <div class="div-baseStats">
            <ul class="ul-stats">
                <li class="li-stats" v-for="baseStat in pokeData.stats" :key="baseStat.name">
                    <div class="div-stat-name">
                        <p class="p-stat">
                            {{ baseStat.name }}:
                        </p>
                    </div>
                    <div class="div-base-stat">
                        <p class="p-stat">
                            {{ baseStat.stat }}
                        </p>
                    </div>
                    <div class="div-progress-bar">
                        <ProgressBar :typeColor="typeColor" :baseStats="baseStat.stat"/>
                    </div>
                </li>
                <li class="li-stats">
                    <div class="div-stat-name">
                        <p class="p-stat">
                            Total:
                        </p>
                    </div>
                    <div class="div-base-stat">
                        <p class="p-stat">
                            {{ totalStats }}
                        </p>
                    </div>
                    <div class="div-progress-bar"></div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { pokeDataStore } from '../stores/quizzStore.js';
import { typeColorEsp } from '../../../helpers/pokeHelpers.js';
import ProgressBar from '../../../components/ProgressBar.vue';

const store = pokeDataStore();
const pokeData = computed(() => store.getPokeData());
const typeColor = typeColorEsp[pokeData.value.types[0]];

const totalStats = computed(() => {
    return pokeData.value.stats.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.stat;
    }, 0);
});
</script>

<style scoped>
.pokeStats-container {
    /* box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.7); */
    display: flex;
    height: auto;
    flex-flow: column;
    margin: 10px;
    width: auto;
}

.h3-stats {
    padding: 0;
    margin: 10px;
}

.div-baseStats {
    width: auto;
    margin: 10px;
}

.ul-stats {
    margin: 0;
    list-style: none;
    padding: 0;
}

.li-stats {
    /* border-bottom: 1px solid #ccc; */
    display: flex;
    padding: 5px;
    /* height: auto;
    width: auto; */
}

.div-stat-name {
    align-content: center;
    text-align: left;
    /* width: 50%; */
    width: 200px;
}

.p-stat {
    font-weight: bold;
    margin: auto;
}

.div-base-stat {
    align-content: center;
    text-align: left;
    /* width: 20%; */
    width: 80px;
}

/* .div-stat-name-total {
    align-content: center;
    text-align: left;
    width: 200px;
}

.div-base-stat-total {
    align-content: center;
    text-align: left;
    width: 30px;
} */

.div-progress-bar {
    align-content: center;
    text-align: left;
    width: 100%;
}

.statsNumber-div {
    text-align: right;
    width: auto;
}

.div-name-total {
    text-align: left;
    width: auto;
    margin-right: 5px;
}
</style>