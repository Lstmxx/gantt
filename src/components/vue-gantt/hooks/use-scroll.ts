import { ref } from 'vue';
import type ScrollBar from '../components/scroller-bar/index.vue';

export function useScroll() {
  const verticalScrollbar = ref<InstanceType<typeof ScrollBar>>();
  const horizontalScrollbar = ref<InstanceType<typeof ScrollBar>>();

  /**
   * scroll
   */
  const handleScroll = (e: WheelEvent) => {
    const { deltaX, deltaY } = e;
    horizontalScrollbar.value?.moveBar(deltaX);
    verticalScrollbar.value?.moveBar(deltaY);
    console.log('content canvas scroll', deltaX, deltaY);
  };
  return {
    handleScroll,
    verticalScrollbar,
    horizontalScrollbar,
  };
}
