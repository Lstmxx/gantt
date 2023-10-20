<script setup lang="ts">
import { ref } from 'vue';
import Gantt from './components/vue-gantt/index.vue';
import { RowData } from './components/vue-gantt/type';
const option = {
  height: 1000,
  width: 1600,
  blockHeight: 32,
  blockWidth: 60,
};

const dataList = ref<RowData[]>([
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
  {
    name: '',
    tasks: [],
  },
]);
</script>

<template>
  <div class="h-screen w-screen bg-slate-600">
    <Gantt :option="option" :data-list="dataList" />
  </div>
</template>
