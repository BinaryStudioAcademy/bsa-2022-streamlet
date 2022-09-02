import dayjs from 'dayjs';

const getDateStringAtDdMmYyyyFormat = (date: Date): string => {
  return dayjs(date).format('DD-MM-YYYY');
};

export { getDateStringAtDdMmYyyyFormat };
