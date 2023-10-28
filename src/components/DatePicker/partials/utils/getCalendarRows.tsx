// our interface for a single cell
import { Dayjs } from 'dayjs';

export interface ICalendarCell {
  text: string;
  value: Dayjs;
}

function getCalendarCells(date: Dayjs): ICalendarCell[] {
  const daysInMonth = date.daysInMonth();
  const calendarCells: ICalendarCell[] = [];

  const prepareCell = (date: Dayjs, dayNumber: number) => {
    return {
      text: String(dayNumber),
      value: date.clone().set('date', dayNumber),
    };
  };

  // push current month day cells
  for (let i = 0; i < daysInMonth; i++) {
    calendarCells.push(prepareCell(date, i + 1));
  }

  // how much more we need to add for date
  const cellsToAdd =
    daysInMonth > 30
      ? 31 - daysInMonth
      : 30 - daysInMonth || daysInMonth <= 28
      ? 28 - daysInMonth
      : 29 - daysInMonth;

  // add to start from prev month
  const lastMonth = date.subtract(1, 'month');
  for (let i = 0; i < Math.floor(cellsToAdd / 2); i++) {
    calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i));
  }

  // add to end from next month
  const nextMonth = date.add(1, 'month');
  for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
    calendarCells.push(prepareCell(nextMonth, i + 1));
  }

  return calendarCells;
}

export function getCalendarRows(date: Dayjs): Array<ICalendarCell[]> {
  const cells = getCalendarCells(date);
  const rows: Array<ICalendarCell[]> = [];

  // split one array into chunks
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return rows;
}
