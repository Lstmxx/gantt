<script lang="ts" setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import type { Props } from './type';
import { generateTimeList, mergeOption } from './utils/utils';
import { BORDER_WIDTH } from './constant';
import { useScroll } from './hooks/use-scroll';
import { Draw } from './utils/draw';
import { render } from './utils/render';

import ScrollerBar from './components/scroller-bar/index.vue';
import DividingLine from './components/dividing-line/index.vue';

let draw: Draw;
const canvasRef = ref<HTMLCanvasElement>();

const props = defineProps<Props>();
const ganttOption = computed(() => mergeOption(props.option || {}));
const dividingLineXPos = ref(0);
const originPoint = ref({ x: 0, y: 0 });

const { handleScroll, horizontalScrollbar, verticalScrollbar } = useScroll({
  callback(x, y) {
    originPoint.value = {
      x,
      y,
    };
    console.log(originPoint.value);
  },
});

/**
 * data相关
 */
const rowDataList = computed(() => props.dataList || []);
/**
 * 预估内容总内容高度
 */
const contentHeight = computed(() => {
  const { blockHeight, height } = ganttOption.value;
  return Math.max(height, rowDataList.value.length * (blockHeight + BORDER_WIDTH));
});
/**
 * 预估内容总宽度高度
 */
const contentWidth = computed(() => {
  const { width, blockWidth } = ganttOption.value;
  return Math.max(width, timeList.value.length * (blockWidth + BORDER_WIDTH));
});

const timeList = computed(() => {
  return generateTimeList(ganttOption.value.timeOption);
});

const canvasVW = computed(() => ganttOption.value.width - dividingLineXPos.value);
const canvasVH = computed(() => ganttOption.value.height);
watch(
  () => [
    canvasVH.value,
    canvasVW.value,
    ganttOption.value.blockHeight,
    ganttOption.value.blockWidth,
  ],
  () => {
    nextTick(() => {
      if (draw) {
        const { height, width } = ganttOption.value;
        draw.resize(height, width);
        render(
          draw,
          originPoint.value.x,
          originPoint.value.y,
          ganttOption.value,
          canvasVW.value,
          canvasVH.value,
        );
      }
    });
  },
  {
    immediate: true,
  },
);

watch(
  () => [originPoint.value],
  () => {
    render(
      draw,
      originPoint.value.x,
      originPoint.value.y,
      ganttOption.value,
      canvasVW.value,
      canvasVH.value,
    );
  },
);

// const test = () => {
//   const maxX = Math.ceil(ganttOption.value.width / ganttOption.value.blockWidth);
//   const maxY = Math.ceil(ganttOption.value.height / ganttOption.value.blockHeight);
//   for (let i = 0; i < 200; i++) {
//     const pos = { x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY) };
//     drawReact(
//       ctx,
//       {
//         x: (ganttOption.value.blockWidth + BORDER_WIDTH) * pos.x,
//         y: (ganttOption.value.blockHeight + BORDER_WIDTH) * pos.y,
//       },
//       ganttOption.value.blockWidth,
//       ganttOption.value.blockHeight,
//     );
//   }
//   // setTimeout(() => {
//   //   if (ctx) {
//   //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//   //     test();
//   //   }
//   // }, 3000);
// };

const init = () => {
  if (canvasRef.value) {
    draw = new Draw(canvasRef.value, canvasVW.value, canvasVH.value);
    // nextTick(() => render(draw, originPoint.value.x, originPoint.value.y, ganttOption.value));
  }
};

onMounted(() => {
  init();
});
</script>

<template>
  <div
    class="flex relative overflow-hidden bg-white"
    :style="{ height: `${ganttOption.height}px`, width: `${ganttOption.width}px` }"
  >
    <div class="flex-1"></div>
    <DividingLine v-model="dividingLineXPos" :total-width="ganttOption.width" />
    <div class="flex flex-col relative" :style="{ width: `${canvasVW}px` }">
      <div class="time-line"></div>
      <div class="relative">
        <ScrollerBar
          ref="verticalScrollbar"
          direction="vertical"
          :content-length="contentHeight"
          :canvas-length="canvasVH"
        />
        <ScrollerBar
          ref="horizontalScrollbar"
          direction="horizontal"
          :content-length="contentWidth"
          :canvas-length="canvasVW"
        />
        <canvas ref="canvasRef" @wheel.stop="handleScroll"></canvas>
      </div>
    </div>
  </div>
</template>
