<script setup lang="ts">
import Gantt from './components/vue-gantt/index.vue';
const option = {
  height: 1400,
  width: 1600,
  blockHeight: 32,
  blockWidth: 60,
};
</script>

<template>
  <div class="h-screen w-screen bg-slate-600">
    <Gantt :option="option" />
  </div>
</template>
