import dayjs from 'dayjs';

const getFormatScheduledDateAt = (date: string): string => {
  const d = dayjs(date);
  return `${d.format('D MMMM')} at ${d.format('H:mm')}`;
};

export { getFormatScheduledDateAt };
