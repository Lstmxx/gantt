import { Draw } from './draw';
import { BORDER_COLOR, BORDER_WIDTH } from '../constant';
import { GanttOption } from '../type';

const tableGridStyle = {
  fillStyle: '#fff',
  lineWidth: BORDER_WIDTH,
  strokeStyle: BORDER_COLOR,
};

export const renderContentGrid = (
  draw: Draw,
  ox: number,
  oy: number,
  option: GanttOption,
  vw: number,
  vh: number,
) => {
  const { blockHeight, blockWidth } = option;
  draw.save();
  const x = ox % blockWidth;
  const y = oy % blockHeight;
  draw.attr(tableGridStyle).translate(-x, -y);
  draw.fillRect(x, y, vw, vh);
  const rows = Math.ceil((vh + y) / blockHeight);
  for (let index = 0; index < rows; index++) {
    const y = index * blockHeight;
    draw.line([0, y], [vw + x, y]);
  }
  const cols = Math.ceil((vw + x) / blockWidth);
  for (let index = 0; index < cols; index++) {
    const x = index * blockWidth;
    draw.line([x, 0], [x, vh + y]);
  }
  console.log('draw grid finish');
  draw.restore();
};

export const renderContent = (draw: Draw) => {
  console.log(draw);
};

export const render = (
  draw: Draw,
  ox: number,
  oy: number,
  option: GanttOption,
  vw: number,
  vh: number,
) => {
  draw.clearRect(0, 0, vw, vh);
  draw.resize(vw, vh);
  /**
   * 渲染表格
   */
  renderContentGrid(draw, ox, oy, option, vw, vh);
  /**
   * 渲染内容
   */
  renderContent(draw);
};
