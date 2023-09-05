<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Props } from './type';
import { initCanvas, initRightWrapperBg } from './utils';
import useAttr from './hooks/use-attr';

let ctx: CanvasRenderingContext2D | null;
const canvasRef = ref<HTMLCanvasElement>();
const props = withDefaults(defineProps<Props>(), {
  option: () => ({
    height: 1200,
    width: 1600,
    blockHeight: 32,
    blockWidth: 60,
  }),
});
const { rightWrapperStyle } = useAttr(props);
console.log(rightWrapperStyle);

onMounted(() => {
  if (canvasRef.value) {
    ctx = initCanvas(canvasRef.value);
    initRightWrapperBg(ctx, props.option);
    console.log(canvasRef);
    console.log(ctx);
  }
});
</script>

<template>
  <canvas
    ref="canvasRef"
    :height="props.option.height"
    :width="props.option.width"
    class="bg-white"
  ></canvas>
</template>
