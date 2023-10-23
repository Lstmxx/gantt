import { ref } from 'vue';
import type ScrollBar from '../components/scroller-bar/index.vue';

export function useScroll({ callback }: { callback: (x: number, y: number) => void }) {
  const verticalScrollbar = ref<InstanceType<typeof ScrollBar>>();
  const horizontalScrollbar = ref<InstanceType<typeof ScrollBar>>();

  /**
   * scroll
   */
  const handleScroll = (e: WheelEvent) => {
    const { deltaX, deltaY } = e;
    const x = horizontalScrollbar.value?.moveBar(deltaX) || 0;
    const y = verticalScrollbar.value?.moveBar(deltaY) || 0;
    callback(x, y);
    console.log('content canvas scroll', deltaX, deltaY);
  };
  return {
    handleScroll,
    verticalScrollbar,
    horizontalScrollbar,
  };
}
