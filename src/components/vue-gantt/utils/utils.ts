import { merge } from 'lodash-es';
import dayjs from 'dayjs';
import { GanttCustomOption, GanttOption, TimeItem } from '../type';

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
      type: 'day',
    },
    title: '',
  };

  const option = merge(defaultOption, ganttCustomOption) as GanttOption;
  option.timeOption.startTime = dayjs(option.timeOption.startTime);
  option.timeOption.endTime = dayjs(option.timeOption.endTime);
  return option;
};
