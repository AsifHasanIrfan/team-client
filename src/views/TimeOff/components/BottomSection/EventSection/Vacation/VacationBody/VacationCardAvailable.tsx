import React from 'react';

type Props = {
  availableMins?: any;
  takenMins?: any;
  title: string;
  available?: boolean;
}

const VacationCardAvailable = ({ takenMins, title, availableMins, available }: Props) => {

  // avilable days calculation
  const totalDaysAvailable = Math.floor((availableMins / 60) / 8);
  const totalHoursAvailable = Math.floor((availableMins - ((totalDaysAvailable * 8) * 60)) / 60);
  const totalMinsAvailable = availableMins - ((totalDaysAvailable * 8) * 60) - (totalHoursAvailable * 60);

  // taken days calculation
  const totalDaysTaken = Math.floor((takenMins / 60) / 8);
  const totalHoursTaken = Math.floor((takenMins - ((totalDaysTaken * 8) * 60)) / 60);
  const totalMinsTaken = takenMins - ((totalDaysTaken * 8) * 60) - (totalHoursTaken * 60);

  return (
    <div className={`w-full md:w-[200px] h-[166px] flex items-center justify-center border border-solid vacation-shadow rounded-[8px] overflow-hidden relative border-l-[5px] ${available ? 'border-l-[#21B979]' : 'border-l-primary'}`}>
      <div className="w-full flex flex-col items-center text-center px-1">

        <h4 className="text-[#1D1D1D] text-[14px] md:text-base font-normal leading-[19px] mb-[16px]">
          {title ? title : 'Available'}
        </h4>

        {available ?
          <p className="text-[#1D1D1D] text-[20px] md:text-base leading-[18.75px] font-medium">{totalDaysAvailable} Days {totalHoursAvailable} Hours {totalMinsAvailable} Min</p> :
          <p className="text-[#1D1D1D] text-[20px] md:text-base leading-[18.75px] font-medium">{totalDaysTaken} Days {totalHoursTaken} Hours {totalMinsTaken} Min</p>}

        {/* <h4 className="text-[#1D1D1D] text-2xl leading-[28px] font-medium ">
          {days ? days : 0} Days
        </h4>
        <h4 className="text-[#BDBDBD] font-medium text-[13px] leading-[15px]">
          {!takenDays && takenDays + ' DAY TAKEN'}
          {takenDays === 1 && takenDays + ' DAY TAKEN'}
          {takenDays > 1 && takenDays + ' DAYS TAKEN'}
        </h4> */}
      </div>
    </div>
  );
};
export default VacationCardAvailable;
