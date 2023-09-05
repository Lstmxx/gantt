import { BORDER_COLOR } from './constant';
import { GanttOption } from './type';

export const isCtxNotNull = (ctx: CanvasRenderingContext2D | null) => !!ctx;

// export const resizeCanvas = (ctx: CanvasRenderingContext2D | null, dpr: number) => {
//   if (!isCtxNotNull(ctx)) return;
//   ctx!.scale(dpr, dpr);
// };

export const initRightWrapperBg = (ctx: CanvasRenderingContext2D | null, option: GanttOption) => {
  if (!isCtxNotNull(ctx)) return;
  const { height = 0, width = 0, blockHeight = 0, blockWidth = 0 } = option;

  const draw = (isColumn: boolean) => {
    const gutter = isColumn ? blockHeight : blockWidth;
    const limit = isColumn ? height : width;
    for (let i = 0; i * gutter < limit; i++) {
      const point = i * gutter;
      ctx!.beginPath();
      ctx!.strokeStyle = BORDER_COLOR;

      if (isColumn) {
        ctx!.moveTo(0, point);
        ctx!.lineTo(width, point);
      } else {
        ctx!.moveTo(point, 0);
        ctx!.lineTo(point, height);
      }
      ctx!.stroke();
    }
  };

  draw(true);
  draw(false);
};

export const initCanvas = (canvasRef: HTMLCanvasElement) => {
  const ctx = canvasRef.getContext('2d');
  const dpr = window.devicePixelRatio;
  const { width: cssWidth, height: cssHeight } = canvasRef.getBoundingClientRect();
  canvasRef.width = dpr * cssWidth;
  canvasRef.height = dpr * cssHeight;
  if (isCtxNotNull(ctx)) {
    ctx!.scale(dpr, dpr);
  }
  return ctx;
};
