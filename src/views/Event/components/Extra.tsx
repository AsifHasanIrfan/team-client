import { eventDataTypes, eventTimeDataTypes } from '@config/types';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Extra = () => {
  const [d, setD] = useState(new Date());
  const [operation, setOperation] = useState(true);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const datas = [
    {
      iamge: '/images/event-img.png',
      title: 'meeting with greeg 13',
      startTime: '7.30 PM',
      date: '8-13-2022',
    },
    {
      iamge: '/images/event-img.png',
      title: 'meeting with greeg 14',
      startTime: '7.30 PM',
      date: '8-14-2022',
    },
  ];

  const timeDatas: eventTimeDataTypes = [
    {
      startTime: '7 AM',
      endTime: '8 AM',
    },
    {
      startTime: '9 AM',
      endTime: '10 AM',
    },
    {
      startTime: '11 AM',
      endTime: '12 PM',
    },
    {
      startTime: '1 PM',
      endTime: '2 PM',
    },
    {
      startTime: '3 AM',
      endTime: '',
    },
  ];

  const allDates: eventDataTypes = [];

  let i;
  for (i = 0; i < 7; i++) {

    let getTime;

    if (i == 0) {
      getTime = d.setDate(d.getDate())
    } else {
      getTime = operation
        ? d.setDate(d.getDate() + 1)
        : d.setDate(d.getDate() - 1);
    }

    const getDate = new Date(getTime).getDate();
    const getDay = days[d.getDay()];
    const getMonth = monthNames[d.getMonth()];
    const countMonth = d.getMonth() + 1;
    const getYear = d.getFullYear();
    const obj = {
      date: getDate,
      month: getMonth,
      countMonth: countMonth,
      day: getDay,
      year: getYear,
      fullDate: `${countMonth}-${getDate}-${getYear}`,
    };
    allDates.push(obj);
  }

  // console.log(allDates);

  // next click on header
  const handleNext = () => {
    const nextDate = `${allDates[6].countMonth}-${allDates[6].date}-${allDates[6].year}`;
    // console.log('next date', nextDate);
    setOperation(true);
    setD(new Date(nextDate));
  };

  // previous click on header
  const handlePrev = () => {
    const prevDate = `${allDates[0].countMonth}-${allDates[0].date}-${allDates[0].year}`;
    // console.log('prev date', prevDate);
    setOperation(false);
    setD(new Date(prevDate));
  };

  // filter data by date
  const filterByDate = datas.filter(
    (item) => item.date === allDates[0].fullDate
  );

  return (
    <>
      <div className="flex justify-center items-center gap-[30px] w-full h-max-40px">
        <div className="pl-[20px] w-[90px]" >
          <button type='button' onClick={handlePrev}>
            <div className='w-[26px] h-[28px] bg-[#E9EBEB] rounded-[5px] flex items-center justify-center'>
              <FiChevronLeft className='text-[#2D2B2B] hover:text-[#EA002E]' />
            </div>
          </button>
        </div>
        <div className="flex gap-[30px] justify-between grow">
          {operation
            ? allDates.map((item, index) => (
              <React.Fragment key={index}>
                <div className="w-[50px]">
                  <p className="text-[#BEBEBE] text-[12px] text-center">
                    {item.month.slice(0, 3)}
                  </p>
                  <p className={`text-[24px] leading-40 text-center ${item.date === new Date().getDate() && 'text-primary'}`}>
                    {item.date}
                  </p>
                  <p className="text-[#BEBEBE] text-[12px] text-center">
                    {item.day.slice(0, 3)}
                  </p>
                </div>
              </React.Fragment>
            ))
            : allDates.reverse().map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-center">
                  <p className="text-[#BEBEBE] text-[12px] text-center">
                    {item.month.slice(0, 3)}
                  </p>
                  <p className={`text-[24px] leading-40 text-center ${item.date === new Date().getDate() && 'text-primary'}`}>
                    {item.date}
                  </p>
                  <p className="text-[#BEBEBE] text-[12px] text-center">
                    {item.day.slice(0, 3)}
                  </p>
                </div>
              </React.Fragment>
            ))}
        </div>
        <div className="w-[90px] text-end pr-[20px]">
          <button type="button" onClick={handleNext}>
            <div className='w-[26px] h-[28px] bg-[#E9EBEB] rounded-[5px] flex items-center justify-center'>
              <FiChevronRight className='text-[#2D2B2B] hover:text-[#EA002E]' />
            </div>
          </button>
        </div>
      </div>

      {/* table section */}

      <div className="">
        {timeDatas?.map((item, index) => (
          <div
            key={index}
            className=" whitespace-nowrap text-sm font-medium text-gray-900 border-r border-t"
          >
            <div className="flex flex-col justify-between h-[138px] p-[20px]">
              <p>{item.startTime}</p>
              <p>{item.endTime}</p>
            </div>
          </div>
        ))}

        <div className="text-sm text-gray-900 font-light whitespace-nowrap w-[132px] h-[118px] border-r border-b border-t p-[10px]">
          <div className="w-[112px] h-[98px] p-[20px_10px] bg-[#FFE5EB] rounded-[10px]">
            <Image
              src="/images/event-img.png"
              width={24}
              height={24}
              alt="event"
            />
            <p className="text-[10px]">7:45 AM</p>
            <p className="text-[9px] w-full">Meeting with Gregg</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Extra;
