<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import type { Props } from './type';
import { initCanvas, initRightWrapperBg, generateTimeList, mergeOption } from './utils';
import { BORDER_WIDTH } from './constant';
import ScrollerBar from './components/scroller-bar/index.vue';
import { useScroll } from './hooks/use-scroll';

let ctx: CanvasRenderingContext2D | null;
const canvasRef = ref<HTMLCanvasElement>();
const bgCtx = ref<CanvasRenderingContext2D | null>(null);
const bgRef = ref<HTMLCanvasElement>();

const props = defineProps<Props>();
const ganttOption = computed(() => mergeOption(props.option || {}));

const { handleScroll, horizontalScrollbar, verticalScrollbar } = useScroll();

const rowDataList = computed(() => props.dataList || []);
const timeList = computed(() => {
  return generateTimeList(ganttOption.value.timeOption);
});
const contentHeight = computed(() => {
  const { blockHeight, height } = ganttOption.value;
  return Math.max(height, rowDataList.value.length * (blockHeight + BORDER_WIDTH));
});

const contentWidth = computed(() => {
  const { width, blockWidth } = ganttOption.value;
  return Math.max(width, timeList.value.length * (blockWidth + BORDER_WIDTH));
});

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

// init Height
watch(
  () => [
    rowDataList,
    ganttOption.value.blockHeight,
    ganttOption.value.blockWidth,
    contentHeight,
    contentWidth,
    bgCtx,
  ],
  () => {
    initRightWrapperBg(bgCtx.value, ganttOption.value, contentWidth.value, contentHeight.value);
  },
  {
    deep: true,
  },
);

onMounted(() => {
  console.log('go');
  if (bgRef.value) {
    bgCtx.value = initCanvas(bgRef.value);
  }
  if (canvasRef.value) {
    ctx = initCanvas(canvasRef.value);
    console.log(ctx);
  }
});
</script>

<template>
  <div
    class="relative overflow-hidden"
    :style="{ height: `${ganttOption.height}px`, width: `${ganttOption.width}px` }"
  >
    <ScrollerBar
      ref="verticalScrollbar"
      direction="vertical"
      :content-length="contentHeight"
      :canvas-length="ganttOption.height"
    />
    <ScrollerBar
      ref="horizontalScrollbar"
      direction="horizontal"
      :content-length="contentWidth"
      :canvas-length="ganttOption.width"
    />
    <canvas
      ref="bgRef"
      class="absolute left-0 top-0 bg-white z-1"
      :height="ganttOption.height"
      :width="ganttOption.width"
    ></canvas>
    <canvas
      ref="canvasRef"
      class="relative z-49"
      :height="ganttOption.height"
      :width="ganttOption.width"
      @wheel.stop="handleScroll"
    ></canvas>
  </div>
</template>
