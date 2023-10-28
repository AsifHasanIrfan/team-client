import React from 'react';
import { Dayjs } from 'dayjs';

// import { ChevronDownIcon } from "";
import { changeDateMonth } from './partials/utils/changeMonth';

// import './partials/css/DatePickerSelector.css';
import clsx from 'clsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export interface IDatePickerSelectorProps {
  shownDate: Dayjs;

  setShownDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

export const DatePickerSelector: React.FC<IDatePickerSelectorProps> = ({
  shownDate,
  setShownDate,
}) => {
  const handleIconClick = (isNextMonth: boolean) => {
    return () => {
      setShownDate(changeDateMonth(shownDate, isNextMonth));
    };
  };

  return (
    <div className={'DatePickerSelector'}>
      <div
        className={clsx(
          'DatePickerSelector__icon',
          'DatePickerSelector__iconLeft'
        )}
        onClick={handleIconClick(false)}
      >
        <IoIosArrowBack />
      </div>

      <div className={'DatePickerSelector__date'}>
        {shownDate.format('MMMM YYYY')}
      </div>

      <div
        className={clsx(
          'DatePickerSelector__icon',
          'DatePickerSelector__iconRight'
        )}
        onClick={handleIconClick(true)}
      >
        <IoIosArrowForward />
      </div>
    </div>
  );
};
