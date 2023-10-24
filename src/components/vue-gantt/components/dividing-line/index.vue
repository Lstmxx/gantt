<script lang="ts" setup>
import { watch } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void;
}>();

const props = defineProps<{
  modelValue: number;
  totalWidth: number;
}>();

const LINE_DEFAULT_X_RATIO = 0.2;
let min = -1;
let max = -1;

watch(
  () => [props.totalWidth],
  () => {
    min = props.totalWidth * LINE_DEFAULT_X_RATIO;
    max = props.totalWidth - min;
    emit('update:modelValue', min);
  },
  {
    immediate: true,
  },
);

// let oldLinePosX = -1;
let isMove = false;
const handleDown = () => {
  isMove = true;
};

const handleUp = () => {
  isMove = false;
};

const handleMove = (e: MouseEvent) => {
  if (isMove) {
    const { movementX } = e;
    let newPos = props.modelValue + movementX;
    if (newPos < min) {
      newPos = min;
    } else if (newPos > max) {
      newPos = max;
    }
    emit('update:modelValue', newPos);
  }
};
</script>

<template>
  <div
    class="absolute h-full cursor-ew-resize z-50 px-[16px]"
    :style="{ left: `${modelValue - 16}px` }"
    @mousedown="handleDown"
    @mouseup="handleUp"
    @mousemove="handleMove"
    @mouseleave="handleUp"
  >
    <div class="h-full w-[2px] bg-gray-400" />
  </div>
</template>

<style scoped lang="scss"></style>
