import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useAttendances from '@hooks/useAttendance';
import useUsers from '@hooks/useUsers';
import { useAppSelector } from '@hooks/useRedux';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { VscCalendar } from 'react-icons/vsc';
import { CSVLink } from 'react-csv';
import Select from 'react-select';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { customStyle } from '@hooks/helpers';
import AttendanceTable from './components/AttendanceTable';

dayjs.extend(timezone);
dayjs.extend(utc);

const Attendance = () => {
  // states
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [csvData, setCSVData] = useState([]);
  const [user, setUser] = useState<any>(null);

  const datePickerRef = useDetectClickOutside({
    onTriggered: () => setIsDatePickerOpen(false),
  });

  // global variable from redux
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { attendances, attendancesLoading } = useAttendances(
    auth.token,
    startDate.toISOString(),
    user?.value
  );
  const { users, usersLoading } = useUsers(auth?.token);

  useEffect(() => {
    // if(attendances?.datas) {
    const data = attendances?.datas?.map((item: any) => {
      return {
        Name: `${item.user.firstName} ${item.user.lastName}`,
        Attendance: `${item.isPresent && 'P'}`,
        Date: dayjs
          .tz(dayjs(item.createdAt), 'America/New_York')
          .format('MMM-DD-YYYY'),
        Time: dayjs
          .tz(dayjs(item.createdAt), 'America/New_York')
          .format('hh:mm A'),
      };
    })
    setCSVData(data ? data : []);
    // }

  }, [attendances?.datas]);

  // user select handler
  function handleUser(selectedUser: any) {
    setUser(selectedUser);
  }

  // user options
  const users_options =
    users?.users
      ?.filter((user: any) => user.role == 'employee')
      .map((e: any) => {
        return { label: `${e.firstName} ${e.lastName}`, value: e._id };
      }) || [];

  // if token empty then loading will go on
  if (!auth.token) return <FullPageLoader />;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-[10px] mb-10 justify-between">
        <div className="w-72 grid items-center p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] bg-white border-[#E0E0E0] ">
          <Select
            onChange={handleUser}
            styles={customStyle}
            options={users_options}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-[10px]">
          <div
            className="3xl:w-[350px] lg:w-[320px] w-[310px] p-[10px] bg-white xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative"
            onClick={() => setIsDatePickerOpen(true)}
            ref={datePickerRef}
          >
            <p className="ml-2">{startDate.format('MMM-YYYY')}</p>
            {isDatePickerOpen && (
              <DatePicker selectedDate={startDate} onChange={setStartDate} />
            )}
            <VscCalendar className="ml-5" />
          </div>

          {/* {csvData?.length > 0 && ( */}
          <CSVLink data={csvData}>
            <Button disabled={csvData?.length === 0} rounded="md">
              Export
            </Button>
          </CSVLink>
          {/* )} */}
        </div>
      </div>
      <div className="bg-[#FFF] shadow-[0px_0px_36px_rgba(0, 0, 0, 0.05)] rounded-[20px] p-[18px_20px_20px_20px]">
        <AttendanceTable
          data={attendances?.datas}
          loading={attendancesLoading}
        />
      </div>
    </>
  );
};

export default Attendance;