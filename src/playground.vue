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
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
  {
    name: '',
    children: [],
  },
]);
</script>

<template>
  <div class="flex h-screen w-screen bg-slate-600 justify-center items-center">
    <Gantt :option="option" :data-list="dataList" />
  </div>
</template>
