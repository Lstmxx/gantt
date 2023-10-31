import { Dayjs } from 'dayjs';

export type GanttCustomOption = {
  width?: number;
  height?: number;
  blockWidth?: number;
  blockHeight?: number;
  timeOption?: {
    startTime: Date;
    endTime: Date;
    type: 'day' | 'month' | 'year';
  };
  title?: string;
};

export type GanttOption = Required<Omit<GanttCustomOption, 'timeOption'>> & {
  timeOption: {
    startTime: Dayjs;
    endTime: Dayjs;
    type: 'day' | 'month' | 'year';
  };
};

export type Children = {
  startTime: Date;
  endTIme: Date;
  color?: string;
  width?: number;
  [key: string]: unknown;
};

export type RowData = {
  name: string;
  children: Children[];
  [key: string]: unknown;
};

export type Props = {
  option?: GanttCustomOption;
  dataList?: RowData[];
};

export type Position = {
  x: number;
  y: number;
};

export type TimeItem = {
  label: string;
};
