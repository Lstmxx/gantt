import { merge } from 'lodash-es';
import dayjs from 'dayjs';
import { BORDER_COLOR, BORDER_WIDTH, DATE_MODE } from './constant';
import { GanttCustomOption, GanttOption, Position, TimeItem } from './type';

export const isCtxNotNull = (ctx: CanvasRenderingContext2D | null) => !!ctx;

// export const resizeCanvas = (ctx: CanvasRenderingContext2D | null, dpr: number) => {

//   if (!isCtxNotNull(ctx)) return;

//   ctx!.scale(dpr, dpr);

// };

export const drawReact = (
  ctx: CanvasRenderingContext2D | null,
  pos: Position,
  w: number,
  h: number,
  color = '#61ABE9',
) => {
  if (!isCtxNotNull(ctx)) return;
  console.log('ccc');
  ctx!.fillStyle = color;
  ctx!.fillRect(pos.x, pos.y, w, h);
};

export const initRightWrapperBg = (
  ctx: CanvasRenderingContext2D | null,
  option: GanttOption,
  contentWidth: number,
  contentHeight: number,
) => {
  if (!isCtxNotNull(ctx)) return;

  const { blockHeight, blockWidth } = option;
  ctx!.lineWidth = BORDER_WIDTH;

  const draw = (
    limit: number,
    gutter: number,
    cb: (ctx: CanvasRenderingContext2D, point: number) => void,
  ) => {
    for (let i = 0; i * gutter < limit; i++) {
      const point = i * gutter;
      ctx!.beginPath();
      ctx!.strokeStyle = BORDER_COLOR;
      cb(ctx!, point);
      ctx!.stroke();
    }
  };
  console.log('contentWidth', contentWidth);
  draw(contentHeight, blockHeight + BORDER_WIDTH, (ctx, point) => {
    ctx.moveTo(0, point);
    ctx.lineTo(contentWidth, point);
  });
  draw(contentWidth, blockWidth + BORDER_WIDTH, (ctx, point) => {
    ctx!.moveTo(point, 0);
    ctx!.lineTo(point, contentHeight);
  });
};

export const initCanvas = (canvasRef: HTMLCanvasElement) => {
  const ctx = canvasRef.getContext('2d');

  // const dpr = window.devicePixelRatio;
  // const { width: cssWidth, height: cssHeight } = canvasRef.getBoundingClientRect();
  // canvasRef.width = dpr * cssWidth;
  // canvasRef.height = dpr * cssHeight;

  if (isCtxNotNull(ctx)) {
    // ctx!.scale(dpr, dpr);
  }

  return ctx;
};

export const generateTimeList = (timeOption: GanttOption['timeOption']): TimeItem[] => {
  // 获取时间选项
  const { endTime, startTime, type } = timeOption;
  // 计算时间差
  const distance = endTime.diff(startTime, type);

  console.log(distance);

  // 获取开始日期
  const start = startTime.clone();
  start.add(-1, type);
  // 返回时间列表
  return Array.from(Array(distance), () => ({ label: start.add(1, type).format('YYYY-MM-DD') }));
};

export const mergeOption = (ganttCustomOption: GanttCustomOption) => {
  const startTime = dayjs(new Date()).startOf('month');
  const endTime = startTime.clone().endOf('month');
  const defaultOption: GanttOption = {
    height: 1200,
    width: 1600,
    blockHeight: 32,
    blockWidth: 60,
    timeOption: {
      startTime,
      endTime,
      type: DATE_MODE.DAY,
    },
  };

  const option = merge(defaultOption, ganttCustomOption) as GanttOption;
  option.timeOption.startTime = dayjs(option.timeOption.startTime);
  option.timeOption.endTime = dayjs(option.timeOption.endTime);
  return option;
};
