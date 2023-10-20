<script lang="tsx" setup>
import { ref, computed } from 'vue';
import { Props } from './type';

const barRef = ref<HTMLElement>();
const BAR_WRAPPER_WIDTH = 10;

const props = defineProps<Props>();

const barPar = computed(() =>
  props.contentLength > props.canvasLength ? props.canvasLength / props.contentLength : 0,
);

const barLength = computed(() => barPar.value * props.canvasLength - BAR_WRAPPER_WIDTH);

const barStyle = computed(() => {
  return props.direction === 'vertical'
    ? { height: `${barLength.value}px` }
    : { width: `${barLength.value}px` };
});

const scrollerWrapperStyle = computed(() => {
  return props.direction === 'vertical'
    ? { height: `${props.canvasLength - BAR_WRAPPER_WIDTH}px` }
    : { width: `${props.canvasLength - BAR_WRAPPER_WIDTH}px` };
});

const countMoveDistance = (oldDistance: number, val: number) => {
  const v = oldDistance + val;
  const total = v + barLength.value;
  if (total > props.canvasLength - BAR_WRAPPER_WIDTH) {
    return props.canvasLength - barLength.value - BAR_WRAPPER_WIDTH;
  } else if (v < 0) {
    return 0;
  }
  return v;
};

const moveBar = (val: number) => {
  if (barRef.value) {
    const { offsetTop, offsetLeft } = barRef.value;
    if (props.direction === 'vertical') {
      barRef.value.style.top = `${countMoveDistance(offsetTop, val)}px`;
      console.log(offsetTop);
      console.log(countMoveDistance(offsetTop, val));
    } else {
      barRef.value.style.left = `${countMoveDistance(offsetLeft, val)}px`;
    }
  }
};

defineExpose({
  moveBar,
});
</script>

<template>
  <div :class="`z-50 scroller-bar-wrapper ${props.direction}`" :style="scrollerWrapperStyle">
    <div ref="barRef" class="bar" :style="barStyle"></div>
  </div>
</template>

<style scoped lang="scss">
.scroller-bar-wrapper {
  position: absolute;
  background: #ecedf1;
  .bar {
    border-radius: 8px;
    background-color: red;
  }
  &.vertical {
    right: 0px;
    top: 0px;
    width: 10px;
    padding: 2px 2px;
    .bar {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
    }
  }
  &.horizontal {
    bottom: 0px;
    left: 0px;
    height: 10px;
    .bar {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
    }
  }
}
</style>
