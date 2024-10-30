<template>
    <div class="bar-container" :style="{ border: `2px solid ${typeColor}` }">
    <!-- <div class="bar-value" :style="{ backgroundColor: typeColor, width: `${baseStats}%` }"></div> -->
    <div class="bar-value" :style="{ backgroundColor: typeColor, width: `${baseStats}%` }"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Recibe el calculo de las estadisticas base y el color del pokemon
// defineProps({
//     typeColor: {
//         type: String,
//         required: true
//     },
//     baseStats: {
//         type: Number,
//         required: true
//     }
// });

const props = defineProps({
    typeColor: {
        type: String,
        required: true
    },
    baseStats: {
        type: Number,
        required: true
    }
});

const typeColorRef = ref(props.typeColor);
const baseStatsRef = ref(props.baseStats);
const statValue = statsProgressWidth();
console.log(statValue);

const statsProgressWidth = async () => {
    const minBaseStat = 1;
    const maxBaseStat = 255;
    const progressStat = ((baseStatsRef.value - minBaseStat) / (maxBaseStat - minBaseStat)) * 100;    //99 / 254
    // console.log(progressStat);
    return progressStat;
}

onMounted(() => {
    // console.log(baseStatsRef.value);
    statsProgressWidth();
});


</script>

<style scoped>
.bar-container {
    align-items: center;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 100px;
    display: flex;
    justify-content: flex-start;
    padding: 0 5px;
    position: relative;
    margin: auto;
    height: 20px;
    width: auto;
}

.bar-container span {
    margin-left: 5px;
    color: #ffffff;
    font-weight: bolder;
}

.bar-value {
    /* animation: load 5s normal forwards; */
    animation: 5s normal forwards;
    box-shadow: 0 10px 40px -10px v-bind(barColor);
    border-radius: 10px;
    /* background-color: v-bind(barColor); */
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    /* width: v-bind(barSize + '%'); */
}

/* @keyframes load {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
} */

</style>