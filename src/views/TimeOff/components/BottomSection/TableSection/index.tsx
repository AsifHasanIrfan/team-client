import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import useTimeoffsById from '@hooks/useTimeoffsById';
import { timeOffDelete } from '@redux/actions/timeoff';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import History from './History';
import Upcoming from './Upcoming';

const TableSection: React.FC = () => {

  // variables
  const today = new Date();
  const tomorrow = today.setDate(today.getDate() - 1);

  // global variable from redux
  const { auth } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  // hooks
  const { timeoffsById, timeoffsByIdLoading, timeoffsByIdFetch } = useTimeoffsById(auth?.token, auth?.user?._id);

  // state
  const [loggedUserTimeoff, setLoggedUserTimeoff] = useState([]);

  // set filter data
  useEffect(() => {
    setLoggedUserTimeoff(timeoffsById?.datas)
  }, [timeoffsById?.datas])

  // timeoff data filtering by start date
  const historyDatas = loggedUserTimeoff?.filter((item: any) => new Date(item.startDate).valueOf() - tomorrow < 0);
  const upcomingDatas = loggedUserTimeoff?.filter((item: any) => new Date(item.startDate).valueOf() - tomorrow > 0);

  // delete timeoff data
  const handleDeleteTimeoff = (selectDeleteId: string, date: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#C10206',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(timeOffDelete(auth.token, selectDeleteId, timeoffsByIdFetch))
      }
    })
  }

  return (
    <div className="flex flex-col xl:w-full gap-y-[30px] 3xl:w-[73%]">
      <Upcoming
        datas={upcomingDatas}
        loading={timeoffsByIdLoading}
        token={auth.token}
        role={auth?.user?.role}
        handleDeleteTimeoff={handleDeleteTimeoff}
      />
      <History
        datas={historyDatas}
        loading={timeoffsByIdLoading}
        token={auth.token}
      />
    </div>
  );
};
export default TableSection;
