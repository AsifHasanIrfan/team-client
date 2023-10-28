import moment from 'moment';
import React, { ChangeEvent, useState } from 'react';
import { useAtom } from 'jotai';

import {
  dateObjectAtom,
  monthTableAtom,
  yearNavAtom,
  selectedDateAtom,
  yearsAtom,
} from '@state/index';
import { currentStatus } from '@utils/currentCalendarStatus';

const CalendarYear = () => {
  const [dateObject, setDateObject] = useAtom(dateObjectAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [showMonthTable, setShowMonthTable] = useAtom(monthTableAtom);
  const [showYearNav, setShowYearNav] = useAtom(yearNavAtom);
  const [years, setYears] = useAtom(yearsAtom);

  const setYear = (year: any) => {
    let dateObj = Object.assign({}, selectedDate);
    dateObj = moment(selectedDate).set('year', year);

    setSelectedDate(dateObj);
    setShowMonthTable(!showMonthTable);
    setShowYearNav(!showYearNav);
  };

  const YearTable = () => {
    let months: any = [];
    let tenyear = years.slice(0, 12);

    tenyear.map((data) => {
      const is_current_month = currentStatus(
        data,
        'year',
        dateObject,
        selectedDate
      )
        ? 'bg-primary md:hover:bg-[#FF0032] text-white'
        : 'hover:bg-slate-200';

      months.push(
        <td
          key={data}
          className={`text-center font-[400] capitalize text-[16px] leading-[22px] px-[7px] py-[13px] rounded-[8px] cursor-pointer transition-all ${is_current_month}`}
          onClick={() => setYear(data)}
        >
          <span>{data}</span>
        </td>
      );
    });

    let rows: any = [];
    let cells: any = [];

    months.forEach((row: any, i: number) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);

    let yearlist = rows.map((d: any, i: number) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <table className="w-full h-full calendar-year">
        <tbody>{yearlist}</tbody>
      </table>
    );
  };

  return <YearTable />;
};

export default CalendarYear;
