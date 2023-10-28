import { useAtom } from 'jotai';
import moment from 'moment';
import React from 'react';

import { dateObjectAtom, selectedDateAtom } from '@state/index';
import { currentStatus } from '@utils/currentCalendarStatus';

const CalendarDate = () => {
  const [dateObject, setDateObject] = useAtom(dateObjectAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  const weekdayshort = moment.weekdaysShort();

  // console.log(selectedDate.year().toString() + selectedDate.date().toString() + selectedDate.month().toString())

  // First day of month
  const firstDayOfMonth = () => {
    let firstDay = moment(selectedDate).startOf('month').format('d');

    return Number(firstDay);
  };

  // change date
  const setDate = (date: number) => {
    let dateObj = Object.assign({}, selectedDate);
    dateObj = moment(selectedDate).set('date', date);

    setSelectedDate(dateObj);
    setDateObject(dateObj);
  };

  // empty days
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    const rand = Math.floor(Math.random() * Math.floor(1000000000));
    blanks.push(
      <td className="empty" key={rand}>
        {''}
      </td>
    );
  }

  // days of month
  const daysInMonth = () => {
    return dateObject.daysInMonth();
  };

  let daysMonth = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    const rand = Math.floor(Math.random() * Math.floor(1000000000));
    let is_current_day = currentStatus(d, 'date', dateObject, selectedDate)
      ? 'bg-[#C10206] hover:bg-[#C10206] text-white'
      : '';

    daysMonth.push(
      <td key={d + rand}>
        <span
          className={` py-[10px] w-[30px] block mx-auto text-center px-[6px] rounded-[8px] font-[400] uppercase text-[16px] leading-[22px] transition-all ${is_current_day}`}
          // onClick={() => setDate(d)}
        >
          {d}
        </span>
      </td>
    );
  }

  var totalSlots = [...blanks, ...daysMonth];
  let rows: any = [];
  let cells: any = [];

  // total slots
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  // Short name of week
  let _rendarShortName = (day: any, i: number) => {
    const rand = Math.floor(Math.random() * Math.floor(1000000000));
    return (
      <th
        key={i + rand}
        className="text-center font-[500] uppercase text-[16px] leading-[22px]"
      >
        {day}
      </th>
    );
  };

  let _rendarDays = (d: any, i: number) => {
    const rand = Math.floor(Math.random() * Math.floor(1000000000));
    return <tr key={i + rand}>{d}</tr>;
  };

  return (
    <div className="h-full calendar-date">
      <table className="w-full h-full calendar-day">
        <thead>
          <tr>{weekdayshort.map(_rendarShortName)}</tr>
        </thead>

        <tbody>{rows.map(_rendarDays)}</tbody>
      </table>
    </div>
  );
};

export default CalendarDate;
