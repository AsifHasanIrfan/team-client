import React, { useState, useEffect } from 'react'
import { useAppSelector } from '@hooks/useRedux'
import { taskDropdownOptions } from '@config/constants'
import { VscCalendar } from 'react-icons/vsc';
import { useDetectClickOutside } from 'react-detect-click-outside';
import DatePicker from '@components/DatePicker';
import dayjs from 'dayjs';
import Button from '@components/Button';
import { useAuth } from '@state/index';

type Props = {
  setSearchByTitle: (searchByTitle: string) => void;
  setSearchByDes: (searchByDes: string) => void;
  setSearchByUsername: (searchByUsername: string) => void;
  setFilterDropdownValue: (filterDropdownValue: string) => void;
  setSortByDate: any;
};

const TaskSearchbar = ({
  setSearchByTitle,
  setSearchByDes,
  setSearchByUsername,
  setFilterDropdownValue,
  setSortByDate,
}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());

  const datePickerRef = useDetectClickOutside({
    onTriggered: () => setIsDatePickerOpen(false),
  });

  const { auth } = useAppSelector((state) => state);
  const { isAdmin } = useAuth();

  return (
    <>
      {isAdmin ? <div className='mb-4'>
        <div className='flex flex-col md:flex-row gap-[10px] justify-end'>
          <div
            className="3xl:w-[350px] lg:w-[320px] w-[300px] p-[10px] bg-white xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative"
            onClick={() => setIsDatePickerOpen(true)}
            ref={datePickerRef}
          >
            <p className="ml-2">{startDate.format('DD-MM-YYYY')}</p>
            {isDatePickerOpen && (
              <DatePicker selectedDate={startDate} onChange={setStartDate} />
            )}
            <VscCalendar className="ml-5" />
          </div>
          <Button onClick={() => setSortByDate(dayjs(startDate).format('DD-MM-YYYY').toString())} rounded='md'>Filter</Button>
          <Button onClick={() => setSortByDate('')} rounded='md'>Remove</Button>
        </div>
      </div> : null}

      <div className="w-full flex items-center mb-[17px] gap-[12px]">
        {auth?.user?.role === 'admin' ? (
          <>
            {/* SEARCH BAR */}
            <div className="flex-1 tasksPage-shadow">
              <input
                placeholder="Search by user name"
                onChange={(e) => setSearchByUsername(e.target.value)}
                className="outline-none border-none w-full px-[9px] py-[12px] rounded-[10px]"
              />
            </div>

            {/* FILTER */}
            <div className="tasksPage-shadow">
              <select
                className="outline-none cursor-pointer border-none px-[5px] py-[12px] rounded-[10px]"
                onChange={(e: any) => setFilterDropdownValue(e.target.value)}
              >
                {taskDropdownOptions.map((e: any, i: number) => (
                  <option className="cursor-pointer" value={e.value} key={i}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {/* SERARCH FILTER FOR USER */}
            <div className="flex gap-[12px] w-full">
              <div className="flex-1 tasksPage-shadow">
                <input
                  placeholder="Search by task title"
                  onChange={(e) => setSearchByTitle(e.target.value)}
                  className="outline-none border-none w-full px-[9px] py-[12px] rounded-[10px]"
                />
              </div>

              <div className="flex-1 tasksPage-shadow">
                <input
                  placeholder="Search by task description"
                  onChange={(e) => setSearchByDes(e.target.value)}
                  className="outline-none border-none w-full px-[9px] py-[12px] rounded-[10px]"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TaskSearchbar