import dayjs from 'dayjs';

export const compareMonth = (date: any) => {
  const currentDateMonth = dayjs(new Date()).format('MM-YY');
  const getDateMonth = dayjs(date).format('MM-YY');
  const compare = currentDateMonth === getDateMonth;
  return compare;
};
