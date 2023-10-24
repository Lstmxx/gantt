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
  const x = tx % blockWidth;
  const y = ty % blockHeight;
  draw.attr(tableGridStyle).translate(-x, -y);
  draw.fillRect(x, y, width, height);
  const rows = Math.ceil((height + y) / blockHeight);
  console.log(rows);
  for (let index = 0; index < rows; index++) {
    const y = index * blockHeight;
    draw.line([0, y], [width + x, y]);
  }
  const cols = Math.ceil((width + x) / blockWidth);
  console.log(cols);
  for (let index = 0; index < cols; index++) {
    const x = index * blockWidth;
    draw.line([x, 0], [x, height + y]);
  }
  console.log('draw');
  draw.restore();
};
