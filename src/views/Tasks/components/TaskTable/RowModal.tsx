import axios from 'axios';
import fileDownload from 'js-file-download';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';

import Modal from '@components/Modal';
import { TaskRowModal } from '@config/types';
import Select from 'react-select';

import Button from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import useEMP from '@hooks/useTeamMemberOfTheMonth';
import { updateTasksData } from '@redux/actions/tasks';
import { useAuth } from '@state/index';
import { BsAlarm } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { VscCalendar } from 'react-icons/vsc';
import AdminTaskModal from './AdminTaskModal';

const RowModal: React.FC<TaskRowModal> = ({
  open,
  setOpen,
  dgCoin,
  title,
  status,
  description,
  revision_description,
  blocked_description,
  latetask_description,
  dueDateAndTime,
  attachments,
  _id,
  worker,
  submissionDate,
  inRevisionCount,
}) => {
  const [rDesc, setRDesc] = useState(revision_description || '');
  const [bDesc, setBDesc] = useState(blocked_description || '');
  const [lDesc, setLDesc] = useState(latetask_description || '');

  const [BDErr, setBDErr] = useState(false);
  const [LTErr, setLTErr] = useState(false);

  const { isAdmin } = useAuth();

  const [tStatus, setStatus] = useState(isAdmin ? 'Assigned' : 'Completed');
  const [isDueDateTime, setIsDueDateTime] = useState(false);
  const [percentDgCoin, setPercentDgCoin] = useState(dgCoin);

  const { auth, tasks, socket } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { empsFetch } = useEMP(auth.token);

  useEffect(() => {
    if (dueDateAndTime) {
      const currentTime = new Date().toISOString();

      setIsDueDateTime(dueDateAndTime > currentTime);
    }
  }, [dueDateAndTime, submissionDate]);

  const adminTaskOptions = [
    {
      value: 'Approved',
      label: 'Approved',
    },
    {
      value: 'Approved Late',
      label: 'Approved Late',
    },
    {
      value: 'Assigned',
      label: 'Assigned',
    },
    {
      value: 'In Progress',
      label: 'In Progress',
    },
    {
      label: 'In Revision',
      value: 'In Revision',
    },
  ];

  const userTaskOptions1 = [
    {
      value: 'Blocked',
      label: 'Blocked',
    },
    {
      value: 'Completed',
      label: 'Completed',
    },
  ];

  const userTaskOptions2 = [
    {
      value: 'Blocked',
      label: 'Blocked',
    },
    {
      value: 'Completed Late',
      label: 'Completed Late',
    },
  ];

  const customStyle = {
    control: (provided: any) => ({
      ...provided,
      height: 0,
      minHeight: '33px',
      padding: 0,
      margin: 0,
      marginLeft: 0,
      border: '0px solid black',
      fontSize: 16,
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#C10206' : 'transparent',
      color: state.isSelected ? 'white' : 'initial',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
        color: state.isSelected ? 'white' : 'initial',
      },
    }),
  };

  const onSelectStatus = (selected: any) => {
    setStatus(selected.value);
    setBDErr(false);
  };

  const handleSubmit = () => {
    if (!isAdmin && tStatus === 'Blocked' && bDesc.length === 0) {
      setBDErr(true);
    } else if (!isAdmin && tStatus === 'Completed Late' && lDesc.length === 0) {
      setBDErr(false);
      setLTErr(true);
    } else if (auth.token) {
      dispatch(
        updateTasksData(
          tStatus,
          rDesc,
          bDesc,
          lDesc,
          auth.token,
          auth.user,
          worker,
          _id,
          auth.user.role,
          setOpen,
          socket,
          percentDgCoin
        )
      );
      empsFetch();
      setBDErr(false);
      setLTErr(false);
    }
  };

  const handleDownload = (url: any, filename: any) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  useEffect(() => {
    if (dgCoin !== undefined) {
      const percent = (20 * dgCoin) / 100;
      setPercentDgCoin(dgCoin - Math.round(percent));
    }
  }, [dgCoin]);

  return (
    <Modal open={open} setOpen={setOpen} title={'Task Details'}>
      <div className="w-[330px] md:w-[550px] xl:w-[850px]">
        {isAdmin ? (
          <AdminTaskModal
            open={open}
            setOpen={setOpen}
            dgCoin={dgCoin}
            title={title}
            description={description}
            dueDateAndTime={dueDateAndTime}
            status={status}
            revision_description={revision_description}
            blocked_description={blocked_description}
            latetask_description={latetask_description}
            _id={_id}
            attachments={attachments}
            worker={worker}
            submissionDate={submissionDate}
            inRevisionCount={inRevisionCount}
          />
        ) : (
          <div>
            <div>
              <div className="mb-[20px] sm:mb-[30px]">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  {' '}
                  Task Title
                </h2>
                <input
                  className="outline-none w-full py-[16px] px-[20px] text-[16px] leading-[22px] border-[1px] rounded-[8px] border-[#E0E0E0] bg-[#FFFFFF]"
                  value={title}
                  disabled
                />
              </div>

              <div className="mb-[20px] sm:mb-[30px]">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  {' '}
                  Task description{' '}
                </h2>
                <div className="outline-none w-full min-h-[48px] max-h-[600px] text-[16px] leading-[22px] py-[16px] px-[20px] border-[1px] rounded-[8px] border-[#E0E0E0]">
                  {description}
                </div>
              </div>

              {(isAdmin && tStatus === 'In Revision') ||
              (isAdmin && status === 'In Revision') ||
              (!isAdmin && status === 'In Revision') ? (
                <div className="mb-[20px] sm:mb-[30px]">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    {' '}
                    Revision description *{' '}
                  </h2>

                  <div className="outline-none w-full min-h-[48px] max-h-[600px] text-[16px] leading-[22px] py-[16px] px-[20px] border-[1px] rounded-[8px] border-[#E0E0E0]">
                    <textarea
                      placeholder="Write ...."
                      value={isAdmin ? rDesc : revision_description}
                      readOnly={isAdmin ? false : true}
                      rows={4}
                      onChange={(e) => setRDesc(e.target.value)}
                      className="w-full outline-none"
                    />
                  </div>
                </div>
              ) : (
                ''
              )}

              {(!isAdmin && tStatus === 'Blocked') ||
              (!isAdmin && status === 'Blocked') ||
              (isAdmin && status === 'Blocked') ? (
                <div className="mb-[20px] sm:mb-[30px]">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    {' '}
                    {isAdmin
                      ? `"blocked" description`
                      : `Why you want's to "blocked" this task?`}
                  </h2>

                  <div
                    className={`
                  outline-none w-full min-h-[48px] max-h-[600px] text-[16px] leading-[22px] py-[16px] px-[20px] border-[1px] rounded-[8px] border-[#E0E0E0]
                  ${BDErr ? 'border-[red]' : ''}
              `}
                  >
                    <textarea
                      placeholder="Write ...."
                      value={!isAdmin ? bDesc : blocked_description}
                      readOnly={!isAdmin ? false : true}
                      onChange={(e) => {
                        setBDesc(e.target.value);
                        bDesc.length > 0 && setBDErr(false);
                      }}
                      className="w-full outline-none"
                    />
                  </div>
                  {BDErr && (
                    <small className="text-[red] mt-[3px] w-full text-right">
                      required *
                    </small>
                  )}
                </div>
              ) : (
                ''
              )}

              {(!isAdmin && tStatus === 'Completed Late') ||
              (!isAdmin && status === 'Completed Late') ||
              (isAdmin && status === 'Completed Late') ? (
                <div className="mb-[20px] sm:mb-[30px]">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    {' '}
                    {isAdmin ? `"Late Task" description` : `Late task reason?`}
                  </h2>

                  <div
                    className={`
                  outline-none w-full min-h-[48px] max-h-[600px] text-[16px] leading-[22px] py-[16px] px-[20px] border-[1px] rounded-[8px] border-[#E0E0E0]
                  ${LTErr ? 'border-[red]' : ''}
              `}
                  >
                    <textarea
                      placeholder="Write ...."
                      value={!isAdmin ? lDesc : latetask_description}
                      readOnly={!isAdmin ? false : true}
                      onChange={(e) => {
                        setLDesc(e.target.value);
                        lDesc.length > 0 && setLTErr(false);
                      }}
                      className="w-full outline-none"
                    />
                  </div>
                  {LTErr && (
                    <small className="text-[red] mt-[3px] w-full text-right">
                      required *
                    </small>
                  )}
                </div>
              ) : (
                ''
              )}

              <div className="flex flex-wrap gap-x-[18px] xl:gap-x-[20px]">
                <div className="mb-[15px] sm:mb-[20px] w-[154px] xl:w-[270px]">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    {' '}
                    Due date
                  </h2>

                  <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center">
                    <VscCalendar />
                    <input
                      className="w-full outline-none bg-[#FFFFFF]"
                      value={moment(dueDateAndTime)
                        .tz(moment.tz.guess())
                        .format('YYYY-DD-MM')}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-[15px] sm:mb-[20px] w-[154px] xl:w-[270px]">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    {' '}
                    Due time{' '}
                  </h2>

                  <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center">
                    <BsAlarm />
                    <input
                      className="w-full outline-none bg-[#FFFFFF]"
                      value={moment(dueDateAndTime)
                        .tz(moment.tz.guess())
                        .format('hh:mm A')}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-[15px] sm:mb-[20px] w-full md:w-[205px] xl:w-[270px]">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    Update task status
                  </h2>

                  <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] task-select">
                    {isAdmin ? (
                      <Select
                        defaultValue={adminTaskOptions.filter(
                          (e: any) => e.value === status
                        )}
                        options={adminTaskOptions}
                        isDisabled={
                          status === 'Approved' || status === 'Approved Late'
                        }
                        styles={customStyle}
                        onChange={onSelectStatus}
                      />
                    ) : (
                      <Select
                        defaultValue={[
                          ...userTaskOptions1,
                          ...userTaskOptions2,
                        ].filter((e: any) => e.value === status)}
                        options={
                          isDueDateTime ? userTaskOptions1 : userTaskOptions2
                        }
                        styles={customStyle}
                        isDisabled={
                          status === 'Approved' ||
                          status === 'Approved Late' ||
                          status === 'Completed' ||
                          status === 'Completed Late' ||
                          status === 'Blocked'
                        }
                        onChange={onSelectStatus}
                      />
                    )}
                  </div>
                </div>

                {isAdmin && submissionDate && (
                  <div className="mb-3 text-red">
                    Submission Date:{' '}
                    {moment(submissionDate)
                      .tz(moment.tz.guess())
                      .format('DD MMM YYYY hh:mm:ss A')}
                  </div>
                )}
              </div>
            </div>

            {attachments?.length > 0 && (
              <div className="mb-[20px] ">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  {' '}
                  Attachment{' '}
                </h2>

                {attachments?.map(({ name, url }: any, i: number) => (
                  <div
                    key={i}
                    onClick={() => handleDownload(url, name)}
                    className="text-[16px] leading-[22px] text-[#0075FF] cursor-pointer gap-[5px] flex items-center w-max mb-[8px]"
                  >
                    <ImAttachment fontSize={18} />
                    <p> {name} </p>
                  </div>
                ))}
              </div>
            )}

            <div className="w-full mt-3">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                Rewards
              </h2>

              <div>
                {isAdmin
                  ? `${worker?.firstName} ${worker?.lastName} will receive `
                  : 'You will receive '}
                <span className="text-2xl font-bold text-primary">
                  {submissionDate
                    ? `${
                        submissionDate > dueDateAndTime ? percentDgCoin : dgCoin
                      }`
                    : `${isDueDateTime ? dgCoin : percentDgCoin}`}
                </span>{' '}
                DG Coins upon completing this task.
              </div>
              {!isAdmin && inRevisionCount > 3 && (
                <p className="text-sm text-red my-2">
                  You are receiving 20% less DG coin. The reason is this task is
                  in revision more than 3 times.
                </p>
              )}
              {submissionDate && submissionDate > dueDateAndTime && (
                <p className="text-sm text-red mt-2">
                  You are receiving 20% less DG coin since the due date and time
                  for this task has passed.
                </p>
              )}
              {!submissionDate && !isDueDateTime && (
                <p className="text-sm text-red mt-2">
                  You are receiving 20% less DG coin since the due date and time
                  for this task has passed.
                </p>
              )}
            </div>

            <div className="flex justify-end md:mt-[10px] pt-3">
              <div className="w-full md:w-max">
                <Button
                  rounded="md"
                  className="w-full h-full !text-sm"
                  onClick={() => handleSubmit()}
                  disabled={
                    status === 'Approved' ||
                    status === 'Approved Late' ||
                    status === 'Completed' ||
                    status === 'Completed Late' ||
                    status === 'Blocked'
                  }
                  loading={tasks.update_task_loading}
                  loadingText="Updating"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RowModal;
