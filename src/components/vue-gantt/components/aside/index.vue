<script lang="ts" setup>
import type { GanttOption } from '../../type';
import { HEADER_HEIGHT } from '../../constant';

defineProps<{
  ganttOption: GanttOption;
}>();
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div
      class="flex border-b-2 border-[#ecedf1] items-center justify-center"
      :style="{ height: `${HEADER_HEIGHT}px` }"
    >
      {{ ganttOption.title || '甘特图' }}
    </div>
    <div class="body"></div>
  </div>
</template>

<style scoped lang="scss"></style>
