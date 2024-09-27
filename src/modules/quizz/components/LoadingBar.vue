<template>
  <div class="progress-bar">
    <div class="progress-inner" :style="{ width: progress + '%'}"></div>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.progress-bar {
    width: 100%;
    height: 20px;
    background-color: #eee;
    border-radius: 5px;
}
.progress-inner {
    height: 100%;
    background-color: #007bff;
    transition: width 0.5s ease;
}
</style>