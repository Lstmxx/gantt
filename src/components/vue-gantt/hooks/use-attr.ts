import { computed } from 'vue';
import { Props } from '../type';
import { BORDER_COLOR, BORDER_WIDTH } from '../constant';

export default function useAttr(props: Props) {
  const rightWrapperStyle = computed(() => {
    const { option } = props;
    const { blockHeight = 0, blockWidth = 0 } = option!;
    const heightWithBorder = blockHeight + BORDER_WIDTH;
    const widthWithBorder = blockWidth + BORDER_WIDTH;
    const topLinearGradient = `-webkit-linear-gradient(top, transparent ${blockHeight}px, ${BORDER_COLOR} ${heightWithBorder}px)`;
    const leftLinearGradient = `-webkit-linear-gradient(left, transparent ${blockWidth}px, ${BORDER_COLOR} ${widthWithBorder}px)`;
    return `background: ${topLinearGradient}, ${leftLinearGradient};background-size: ${widthWithBorder}px ${heightWithBorder}px`;
  });
  return {
    rightWrapperStyle,
  };
}
