<template>
    <div class="bar-container" :style="{ border: `2px solid ${typeColor}` }">
        <!-- <div class="bar-value" :style="{ backgroundColor: typeColor, width: baseStats + '%' }"></div> -->
        <div class="bar-value"></div>
    </div>
</template>

<script setup>
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
    align-items: center;
    /* animation: load 1s normal forwards; */
    animation: barLoading 1s ease-in-out forwards;
    background-color: v-bind(typeColor);
    border-radius: 100px;
    padding: 0 5px;
    position: absolute;
    left: 0;
    margin: auto;
    height: 20px;
    width: v-bind(baseStats + '%');
}

@keyframes barLoading {
    0% {
        width: 0;
    }
    100% {
        width: v-bind(baseStats + '%');
    }
}

</style>