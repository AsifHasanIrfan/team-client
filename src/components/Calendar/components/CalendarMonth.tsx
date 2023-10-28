import { useAtom } from 'jotai';
import moment from 'moment';
import React, { useState } from 'react';

import {
  calendarTableAtom,
  dateObjectAtom,
  monthTableAtom,
  selectedDateAtom,
} from '@state/index';
import { currentStatus } from '@utils/currentCalendarStatus';

const CalendarMonth = () => {
  const [allmonths, setAllMonths] = useState(moment.months());
  const [dateObject, setDateObject] = useAtom(dateObjectAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [showMonthTable, setShowMonthTable] = useAtom(monthTableAtom);
  const [showCalendarTable, setShowCalendarTable] = useAtom(calendarTableAtom);

  const setMonth = (month: string) => {
    let monthNo = allmonths.indexOf(month);
    let dateObj = Object.assign({}, selectedDate);
    dateObj = moment(selectedDate).set('month', monthNo);

    setSelectedDate(dateObj);
    setShowMonthTable(!showMonthTable);
    setShowCalendarTable(!showCalendarTable);
  };

  let MonthList = ({ data }: any) => {
    let months: any = [];
    data.map((data: any) => {
      const is_current_month = currentStatus(
        data,
        'month',
        dateObject,
        selectedDate
      )
        ? 'bg-primary md:hover:bg-[#FF0032] text-white'
        : 'hover:bg-slate-200';

      months.push(
        <td
          key={data}
          className={`text-center font-[400] capitalize text-[16px] leading-[22px] px-[7px] py-[13px] rounded-[8px] cursor-pointer transition-all ${is_current_month}`}
          onClick={() => setMonth(data)}
        >
          <span>{data}</span>
        </td>
      );
    });

    let rows: any = [];
    let cells: any = [];

    months.forEach((row: any, i: number) => {
      if (i % 3 !== 0 || i == 0) {
        // except zero index
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d: string, i: number) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <table className="w-full h-full calendar-month">
        <tbody>{monthlist}</tbody>
      </table>
    );
  };

  return <MonthList data={moment.months()} />;
};

export default CalendarMonth;
