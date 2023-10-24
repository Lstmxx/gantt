<script lang="ts" setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import type { Props } from './type';
import { generateTimeList, mergeOption } from './utils/utils';
import { BORDER_WIDTH } from './constant';
import ScrollerBar from './components/scroller-bar/index.vue';
import { useScroll } from './hooks/use-scroll';
import { Draw } from './utils/draw';
import { renderContentGrid } from './utils/grid';

let draw: Draw;
const canvasRef = ref<HTMLCanvasElement>();

const props = defineProps<Props>();
const ganttOption = computed(() => mergeOption(props.option || {}));

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
const contentHeight = computed(() => {
  const { blockHeight, height } = ganttOption.value;
  return Math.max(height, rowDataList.value.length * (blockHeight + BORDER_WIDTH));
});
const contentWidth = computed(() => {
  const { width, blockWidth } = ganttOption.value;
  return Math.max(width, timeList.value.length * (blockWidth + BORDER_WIDTH));
});

const timeList = computed(() => {
  return generateTimeList(ganttOption.value.timeOption);
});

watch(
  () => [
    ganttOption.value.height,
    ganttOption.value.width,
    ganttOption.value.blockHeight,
    ganttOption.value.blockWidth,
  ],
  () => {
    if (draw) {
      const { height, width } = ganttOption.value;
      draw.resize(height, width);
      renderContentGrid(draw, originPoint.value.x, originPoint.value.y, ganttOption.value);
    }
  },
  {
    immediate: true,
  },
);

watch(
  () => [originPoint.value],
  () => {
    renderContentGrid(draw, originPoint.value.x, originPoint.value.y, ganttOption.value);
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
    draw = new Draw(canvasRef.value, ganttOption.value.width, ganttOption.value.height);
    nextTick(() =>
      renderContentGrid(draw, originPoint.value.x, originPoint.value.y, ganttOption.value),
    );
  }
};

onMounted(() => {
  init();
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
    <canvas ref="canvasRef" @wheel.stop="handleScroll"></canvas>
  </div>
</template>
