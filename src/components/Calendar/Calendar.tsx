import React from 'react';

import { enGB } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';

const Calendar = () => {

  return (
    <div className="h-max">
        <DatePickerCalendar locale={enGB} />
    </div>
  );
};

export default Calendar;
