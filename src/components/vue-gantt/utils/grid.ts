import { Draw } from './draw';
import { BORDER_COLOR, BORDER_WIDTH } from '../constant';
import { GanttOption } from '../type';

const tableGridStyle = {
  fillStyle: '#fff',
  lineWidth: BORDER_WIDTH,
  strokeStyle: BORDER_COLOR,
};

export const renderContentGrid = (draw: Draw, tx: number, ty: number, option: GanttOption) => {
  const { blockHeight, blockWidth, height, width } = option;
  draw.clearRect(0, 0, width, height);
  draw.save();
  draw.attr(tableGridStyle).translate(-tx, -ty);
  const rows = Math.ceil((height + ty) / blockHeight);
  for (let index = 0; index < rows; index++) {
    const y = index * blockHeight;
    draw.line([0, y], [width + tx, y]);
  }
  const cols = Math.ceil((width + tx) / blockWidth);
  for (let index = 0; index < cols; index++) {
    const x = index * blockWidth;
    draw.line([x, 0], [x, height + ty]);
  }
  console.log('draw');
  draw.restore();
};
