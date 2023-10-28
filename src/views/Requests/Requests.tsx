import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import { cx, requestsPageData } from '@config/constants';
import PasswordRequest from './components/PasswordRequest';
import RequestsTimeOf from './components/RequestsTimeOf';
import UserInfoRequests from './components/UserInfoRequests';
import AccountRequest from './components/AccountRequest/AccountRequest';
import { HiPlusSm } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import useLoginRequests from '@hooks/useLoginRequests';
import { forgetPasswordRequestGet } from '@redux/actions/forgetRequest';
import useUser from '@hooks/useUser';
import useChangeOffDayReq from '@hooks/useChangeOffDayReq';
import ChangeOffDay from './components/ChangeOffDay/ChangeOffDay';
import useTimeoffs from '@hooks/useTimeoffs';

function Requests() {

  // router
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { auth, forgetRequest } = useAppSelector((state) => state);

  // get query
  const query: any = router.query

  // hooks
  const { requestLogins, requestLoginsLoading, requestLoginsFetch } = useLoginRequests(auth?.token);
  const { user, userFetch } = useUser(auth?.token, auth?.user?._id)
  const { changeOffDays, changeOffDaysLoading, changeOffDaysFetch } = useChangeOffDayReq(auth?.token);
  const { timeoffs, timeoffsLoading, timeoffsFetch } = useTimeoffs(auth?.token);

  // states
  const [index, setIndex] = useState<number>(0);
  const [totalTimeoffRequest, setTotalTimeoffRequest] = useState(0);
  const [totalUserInfoRequest, setTotalUserInfoRequest] = useState(0);
  const [totalPasswordRequest, setTotalPasswordRequest] = useState(0);
  const [totalAccountRequest, setTotalAccountRequest] = useState(0);
  const [totalChangeOffDayRequest, setTotalChangeOffDayRequestt] = useState(0);

  // change off day
  const [filterByChangOffDay, setFilterByChangeOffDay] = useState('progress');
  const [filterDataChangeOffDay, setFilterDataChangeOffDay] = useState([]);
  const [valueOffChangeReq, setValueOffCahnageReq] = useState('');

  // acc req states
  const [filterByAcc, setFilterByAcc] = useState('progress');
  const [filterDataAcc, setFilterDataAcc] = useState([]);

  // pass req states
  const [filterByPassReq, setFilterByPassReq] = useState('progress');
  const [filterDataPassReq, setFilterDataPassReq] = useState([]);
  const [valuePassReq, setValuePassReq] = useState('');

  // updated req state
  const [updateRequestData, setUpdateRequestData] = useState<any>([]);

  // set filter data for account request
  useEffect(() => {
    setFilterDataAcc(requestLogins?.datas?.filter((item: any) => item.status === filterByAcc))
    setTotalAccountRequest(requestLogins?.datas?.filter((item: any) => item.status === filterByAcc)?.length)
  }, [requestLogins?.datas, filterByAcc, setTotalAccountRequest])

  // set filter data for change off day request
  useEffect(() => {

    const changeOffDayReqs = timeoffs?.datas?.filter((item: any) => item.type === 'Change Off Day')

    setFilterDataChangeOffDay(changeOffDayReqs?.filter((item: any) => item.status === filterByChangOffDay))
    setTotalChangeOffDayRequestt(changeOffDayReqs?.filter((item: any) => item.status === filterByChangOffDay)?.length)
  }, [timeoffs?.datas, filterByChangOffDay, setTotalChangeOffDayRequestt])

  // get api data
  useEffect(() => {
    if (auth.token) {
      dispatch(forgetPasswordRequestGet(auth.token))
    }
  }, [dispatch, auth.token])

  // set filter data
  useEffect(() => {
    setTotalPasswordRequest(forgetRequest?.forget_request_datas?.filter((item: any) => item.status === 'progress')?.length)
    if (valuePassReq) {
      const flDatas = forgetRequest?.forget_request_datas?.filter((item: any) => item.status === filterByPassReq);
      setFilterDataPassReq(flDatas.filter((el: any) => (el.username)?.match(new RegExp(valuePassReq, "i"))));
    } else {
      setFilterDataPassReq(forgetRequest?.forget_request_datas?.filter((item: any) => item.status === filterByPassReq))
    }
  }, [valuePassReq, forgetRequest.forget_request_datas, filterByPassReq, setTotalPasswordRequest])

  // updated req
  useEffect(() => {
    userFetch();
    if (user?.user) {
      setTotalUserInfoRequest(user?.user?.updateRequest?.length)
      setUpdateRequestData(user?.user?.updateRequest);
    }
  }, [user?.user, userFetch, setTotalUserInfoRequest]);


  useEffect(() => {
    if (query.for) {
      setIndex(Number(query.for))
    }
  }, [query])

  return (
    <div className="space-y-5 requestPage">

      <nav className=''>
        <ul className="flex items-center md:gap-2 gap-1 bg-white rounded-[10px] mt-5 md:mt-0 py-3 px-4">
          {requestsPageData.map(({ navText }, i) => {
            return (
              <li key={i} onClick={() => setIndex(i)}
                className={cx(
                  'md:text-lg text-sm text-primary rounded-[10px] hover:text-lightHover md:font-medium font-normal cursor-pointer md:mx-2 mx-1 transition ease-in-out duration-300 relative',
                  index === i && 'bg-primary !text-white md:px-5 px-3 md:py-4 py-2 hover:bg-lightHover'
                )}>
                <button className='outline-none'>
                  {navText}
                  {(i === 0 && index !== i) && <>{totalTimeoffRequest > 9 ? <span className=' ml-1 p-[6px] bg-primary text-white text-[12px] rounded-full relative top-[-12px]'>9 +</span> : <span className='ml-1 px-[7px] py-1 bg-primary text-white text-[12px] rounded-full relative top-[-10px]'>{totalTimeoffRequest}</span>}</>}
                  {(i === 1 && index !== i) && <>{totalUserInfoRequest > 9 ? <span className=' ml-1 p-[6px] bg-primary text-white text-[12px] rounded-full relative top-[-12px]'>9 +</span> : <span className='ml-1 px-[7px] py-1 bg-primary text-white text-[12px] rounded-full relative top-[-10px]'>{totalUserInfoRequest}</span>}</>}
                  {(i === 2 && index !== i) && <>{totalPasswordRequest > 9 ? <span className=' ml-1 p-[6px] bg-primary text-white text-[12px] rounded-full relative top-[-12px]'>9 +</span> : <span className='ml-1 px-[7px] py-1 bg-primary text-white text-[12px] rounded-full relative top-[-10px]'>{totalPasswordRequest}</span>}</>}
                  {(i === 3 && index !== i) && <>{totalAccountRequest > 9 ? <span className=' ml-1 p-[6px] bg-primary text-white text-[12px] rounded-full relative top-[-12px]'>9 +</span> : <span className='ml-1 px-[7px] py-1 bg-primary text-white text-[12px] rounded-full relative top-[-10px]'>{totalAccountRequest}</span>}</>}
                  {(i === 4 && index !== i) && <>{totalChangeOffDayRequest > 9 ? <span className=' ml-1 p-[6px] bg-primary text-white text-[12px] rounded-full relative top-[-12px]'>9 +</span> : <span className='ml-1 px-[7px] py-1 bg-primary text-white text-[12px] rounded-full relative top-[-10px]'>{totalChangeOffDayRequest}</span>}</>}
                </button>
                {index === i ? <span className={`absolute top-[-14%] md:top-[-18%] right-[-5%] py-[2px] px-[8px] md:px-[12px] text-[12px] md:text-[16px] rounded-full bg-[#333333] ${((index === 0 && totalTimeoffRequest > 9) ||
                  (index === 1 && totalUserInfoRequest > 9) ||
                  (index === 2 && totalPasswordRequest > 9) ||
                  (index === 3 && totalAccountRequest > 9) || (index === 4 && totalChangeOffDayRequest > 9)) && 'md:py-[6px] !py-[3px] !px-[5px] md:top-[-22%] top-[-28%] right-[-8%] md:!text-[14px] !text-[10px]'
                  }`}>
                  {index === 0 && (totalTimeoffRequest > 9 ? <span className='flex items-center relative left-[2px]'>9 <HiPlusSm /></span> : totalTimeoffRequest)}
                  {index === 1 && (totalUserInfoRequest > 9 ? <span className='flex items-center relative left-[2px]'>9 <HiPlusSm /></span> : totalUserInfoRequest)}
                  {index === 2 && (totalPasswordRequest > 9 ? <span className='flex items-center relative left-[2px]'>9 <HiPlusSm /></span> : totalPasswordRequest)}
                  {index === 3 && (totalAccountRequest > 9 ? <span className='flex items-center relative left-[2px]'>9 <HiPlusSm /></span> : totalAccountRequest)}
                  {index === 4 && (totalChangeOffDayRequest > 9 ? <span className='flex items-center relative left-[2px]'>9 <HiPlusSm /></span> : totalChangeOffDayRequest)}
                </span> : ''}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={cx('flex flex-col px-5 py-[18px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative')}>
        {index === 0 && <RequestsTimeOf setTotalTimeoffRequest={setTotalTimeoffRequest} />}

        {index === 1 && <UserInfoRequests
          token={auth?.token}
          updateRequestData={updateRequestData}
        />}

        {index === 2 && <PasswordRequest
          token={auth?.token}
          filterBy={filterByPassReq}
          setFilterBy={setFilterByPassReq}
          value={valuePassReq}
          setValue={setValuePassReq}
          forget_request_datas={filterDataPassReq}
          loading={forgetRequest?.forget_request_loading}
        />}

        {index === 3 && <AccountRequest
          token={auth?.token}
          filterData={filterDataAcc}
          requestLoginsLoading={requestLoginsLoading}
          filterBy={filterByAcc}
          setFilterBy={setFilterByAcc}
          requestLoginsFetch={requestLoginsFetch}
        />}

        {index === 4 && <ChangeOffDay
          token={auth?.token}
          filterData={filterDataChangeOffDay}
          loading={timeoffsLoading}
          filterBy={filterByChangOffDay}
          setFilterBy={setFilterByChangeOffDay}
          value={valueOffChangeReq}
          setValue={setValueOffCahnageReq}
          userFetch={userFetch}
          requestFetch={timeoffsFetch}
        />}

      </div>

    </div>
  );
}

export default Requests;
