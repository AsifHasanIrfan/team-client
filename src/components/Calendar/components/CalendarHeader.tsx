import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import {
  calendarTableAtom,
  dateObjectAtom,
  monthTableAtom,
  selectedDateAtom,
  yearsAtom,
} from '@state/index';
import { monthsName } from '@config/constants';
import moment from 'moment';

const CalendarHeader = () => {
  const [dateObject, setDateObject] = useAtom(dateObjectAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  const [showMonthTable, setShowMonthTable] = useAtom(monthTableAtom);
  const [showCalendarTable, setShowCalendarTable] = useAtom(calendarTableAtom);

  const [years, setYears] = useAtom(yearsAtom);

  const [selectedMonth, setSelectedMonth] = useState(selectedDate.month());
  const [selectedYear, setSelectedYear] = useState(selectedDate.year());

  const onPrev = () => {
    if (showCalendarTable || showMonthTable) {
      let dateObj = Object.assign({}, dateObject);
      dateObj = moment(dateObject).subtract(
        1,
        showMonthTable ? 'year' : 'month'
      );

      setDateObject(dateObj);
    } else {
      setYears(Array.from({ length: 12 }, (v, i) => years[0] - 12 + i + 1));
    }
  };

  const onNext = () => {
    if (showCalendarTable || showMonthTable) {
      let dateObj = Object.assign({}, dateObject);
      dateObj = moment(dateObject).add(1, showMonthTable ? 'year' : 'month');

      setDateObject(dateObj);
    } else {
      setYears(
        Array.from(
          { length: 12 },
          (v, i) => years[years.length - 1] + 12 - i - 1
        ).reverse()
      );
    }
  };

  const DateHeaderMiddle = () => {
    function handleMonthTable() {
      setShowCalendarTable(false);
      setShowMonthTable(true);
    }

    return (
      <div className="w-full" onClick={() => handleMonthTable()}>
        <span>
          {monthsName[selectedMonth]}, {selectedYear}
        </span>
      </div>
    );
  };

  const MonthHeaderMiddle = () => {
    function handleYear() {
      setShowCalendarTable(false);
      setShowMonthTable(false);
    }

    return (
      <div className="w-full" onClick={() => handleYear()}>
        <span>
          {monthsName[selectedMonth]}, {selectedYear}
        </span>
      </div>
    );
  };

  const YearHeaderMiddle = () => {
    return (
      <div>
        <span>{selectedYear}</span>
      </div>
    );
  };

  useEffect(() => {
    setSelectedMonth(selectedDate.month());
    setSelectedYear(selectedDate.year());
  }, [selectedDate]);

  useEffect(() => {
    setSelectedMonth(dateObject.month());
    setSelectedYear(dateObject.year());
  }, [dateObject]);

  return (
    <div className="flex mb-[20px]">
      <button
        className="flex items-center border-none outline-none justify-center rounded-[8px] w-[37px] h-[37px] hover:text-white cursor-pointer hover:bg-[#C10206] transition-all"
        onClick={() => onPrev()}
      >
        <IoIosArrowBack />
      </button>

      <button className="flex items-center border-none outline-none justify-center rounded-[8px] w-[37px] h-[37px] flex-auto text-center cursor-pointer font-[500] leading-[21px] text-[18px] hover:bg-slate-200 transition-all">
        {showMonthTable && <MonthHeaderMiddle />}
        {showCalendarTable && <DateHeaderMiddle />}
        {!showCalendarTable && !showMonthTable ? <YearHeaderMiddle /> : ''}
      </button>

      <button
        className="flex border-none outline-none items-center justify-center rounded-[8px] w-[37px] h-[37px] hover:text-white cursor-pointer hover:bg-[#C10206] transition-all"
        onClick={() => onNext()}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default CalendarHeader;
