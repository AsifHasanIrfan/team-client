import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import moment from 'moment-timezone';
import Select from 'react-select';
import * as Yup from 'yup';

import { VscCalendar } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { adminUpdateTask, updateTasksData } from '@redux/actions/tasks';
import { useAuth } from '@state/index';
import useEMP from '@hooks/useTeamMemberOfTheMonth';
import dayjs from 'dayjs';
import DatePicker from '@components/DatePicker';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { cx } from '@config/constants';
import { TaskRowModal } from '@config/types';
import Button from '@components/Button';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

const AdminTaskModal: React.FC<TaskRowModal> = ({
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
  const [startDatePicker, setStartDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());

  const startDateRef = useDetectClickOutside({
    onTriggered: () => setStartDatePicker(false),
  });

  const { isAdmin } = useAuth();

  const [tStatus, setStatus] = useState(isAdmin ? 'Assigned' : 'Completed');
  const [isDueDateTime, setIsDueDateTime] = useState(false);
  const [percentDgCoin, setPercentDgCoin] = useState(dgCoin);

  const { auth, tasks, socket } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { empsFetch } = useEMP(auth.token);

  const [taskInitialValues, setTaskInitialValues] = useState({
    taskTitle: '',
    taskDescription: '',
    inRevisionDescription: '',
    dueTime: '',
    lateTaskDescription: '',
    taskBlockedDescription: '',
    dgCoin: 0
  });

  useEffect(() => {
    setTaskInitialValues({
      taskTitle: title,
      taskDescription: description,
      inRevisionDescription: revision_description || '',
      dueTime: `${moment(dueDateAndTime)
        .tz(moment.tz.guess())
        .format('HH:mm')}`,
      lateTaskDescription: latetask_description || '',
      taskBlockedDescription: blocked_description || '',
      dgCoin: dgCoin || 0
    });
    //@ts-ignore
    setStartDate(dayjs(dueDateAndTime));
    setStatus(status);
  }, [title, description, dueDateAndTime, revision_description, latetask_description, blocked_description, status, dgCoin]);

  const UpdateTaskSchema = Yup.object().shape({
    taskTitle: Yup.string().required('Required'),
    taskDescription: Yup.string().required('Required'),
  });

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
  };

  const onSubmit = (value: any) => {
    const formattedDate = startDate.format('YYYY-MM-DD');
    const formattedTime = moment(value.dueTime, 'hh:mm').format('hh:mm:ss a');

    const formattedDateAndTime = `${formattedDate} ${formattedTime}`;

    const isoDateString = new Date(formattedDateAndTime).toISOString();

     const percent = (20 * value.dgCoin) / 100;
     const percentDgCoin = value.dgCoin - Math.round(percent);

    if (auth.token) {
      dispatch(
        adminUpdateTask(
          value,
          tStatus,
          auth.token,
          auth.user,
          worker,
          _id,
          setOpen,
          socket,
          percentDgCoin,
          isoDateString,
          value.dgCoin
        )
      );
      empsFetch();
    }
  };

  useEffect(() => {
    if (dgCoin) {
      const percent = (20 * dgCoin) / 100;
      setPercentDgCoin(dgCoin - Math.round(percent));
    }
  }, [dgCoin]);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={taskInitialValues}
        validationSchema={UpdateTaskSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-[20px] sm:mb-[30px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                {' '}
                Task Title
                {errors.taskBlockedDescription}
              </h2>
              <Field
                name="taskTitle"
                className={cx(
                  errors.taskTitle &&
                    touched.taskTitle &&
                    'border border-[red]',
                  'outline-none w-full py-[16px] px-[20px] text-[16px] leading-[22px] border-[1px] rounded-[8px] border-[#E0E0E0] bg-[#FFFFFF]'
                )}
                placeholder="Task title"
              />

              {errors.taskTitle && touched.taskTitle ? (
                <div className="ml-1.5 mt-1.5 text-[red]">
                  {errors.taskTitle}
                </div>
              ) : null}
            </div>

            <div className="mb-[20px] sm:mb-[30px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                Task description
              </h2>
              <Field
                component="textarea"
                rows={4}
                name="taskDescription"
                className={cx(
                  errors.taskDescription &&
                    touched.taskDescription &&
                    'border border-[red]',
                  'outline-none w-full py-[16px] px-[20px] text-[16px] leading-[22px] border-[1px] rounded-[8px] border-[#E0E0E0] bg-[#FFFFFF]'
                )}
                placeholder="Task description"
              />

              {errors.taskDescription && touched.taskDescription ? (
                <div className="ml-1.5 mt-1.5 text-[red]">
                  {errors.taskDescription}
                </div>
              ) : null}
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
                  <Field
                    as="textarea"
                    placeholder="Write ...."
                    name="inRevisionDescription"
                    rows={4}
                    className="w-full outline-none"
                  />
                </div>
              </div>
            ) : null}

            {isAdmin && status === 'Blocked' ? (
              <div className="mb-[20px] sm:mb-[30px]">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  &quot;blocked&quot; description
                </h2>

                <div
                  className={`outline-none w-full min-h-[48px] max-h-[600px] text-[16px] leading-[22px] py-[16px] px-[20px] border-[1px] rounded-[8px] border-[#E0E0E0]`}
                >
                  <Field
                    as="textarea"
                    placeholder="Write ...."
                    name="taskBlockedDescription"
                    readOnly={true}
                    className="w-full outline-none"
                  />
                </div>
              </div>
            ) : null}

            {isAdmin && status === 'Completed Late' ? (
              <div className="mb-[20px] sm:mb-[30px]">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  &quot;Late Task&quot; description
                </h2>

                <div
                  className={`outline-none w-full min-h-[48px] max-h-[600px] text-[16px] leading-[22px] py-[16px] px-[20px] border-[1px] rounded-[8px] border-[#E0E0E0]`}
                >
                  <Field
                    as="textarea"
                    placeholder="Write ...."
                    name="lateTaskDescription"
                    readOnly={true}
                    className="w-full outline-none"
                  />
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[18px] xl:gap-x-[20px]">
              <div className="mb-[15px] sm:mb-[20px] w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Due date
                </h2>

                <div
                  className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative"
                  onClick={() => setStartDatePicker(true)}
                  ref={startDateRef}
                >
                  <p className="ml-2">
                    {/* @ts-ignore */}
                    {dayjs(startDate).tz(dayjs.tz.guess()).format('YYYY-DD-MM')}
                  </p>
                  {startDatePicker && (
                    <Field
                      type="text"
                      component={DatePicker}
                      selectedDate={startDate}
                      onChange={setStartDate}
                      name="dueDate"
                      value={startDate}
                    />
                  )}
                  <VscCalendar className="ml-5" />
                </div>
              </div>

              <div className="mb-[15px] sm:mb-[20px] w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Due time{' '}
                </h2>

                <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative">
                  <Field
                    name="dueTime"
                    type="time"
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <div className="mb-[15px] sm:mb-[20px] w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Update task status
                </h2>

                <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] task-select">
                  <Select
                    defaultValue={adminTaskOptions.filter(
                      (e: any) => e.value === status
                    )}
                    options={adminTaskOptions}
                    isDisabled={
                      status === 'Approved' || status === 'Approved Late'
                    }
                    isSearchable={false}
                    styles={customStyle}
                    onChange={onSelectStatus}
                  />
                </div>
              </div>

              <div className="mb-[20px] sm:mb-[15px]">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Enter DG coin
                </h2>
                <Field
                  type="number"
                  name="dgCoin"
                  min={0}
                  className="outline-none w-full p-[10px] xl:py-[16px] xl:px-[20px] text-[16px] leading-[22px] border-[1px] rounded-[8px] border-[#E0E0E0] bg-[#FFFFFF]"
                  placeholder="Enter ......"
                />
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

            {/* <div className="w-full mt-3">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                Rewards
              </h2>

              <div>
                {worker.firstName} {worker.lastName} will receive{' '}
                <span className="text-2xl font-bold text-primary">
                  {isDueDateTime ? dgCoin : percentDgCoin}
                </span>{' '}
                DG Coins upon completing this task.
              </div>
            </div> */}

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
              {inRevisionCount > 3 && (
                <p className="text-sm text-red my-2">
                  {`${worker?.firstName} ${worker?.lastName}`} will receive 20%
                  less DG coin. The reason is this task is in revision more than
                  3 times.
                </p>
              )}
              {submissionDate && submissionDate > dueDateAndTime && (
                <p className="text-sm text-red mt-2">
                  {`${worker?.firstName} ${worker?.lastName}`} will receive 20%
                  less DG coin since the due date and time for this task has
                  passed.
                </p>
              )}
            </div>

            <div className="flex justify-end md:mt-[10px] pt-3">
              <div className="w-full md:w-max">
                <Button
                  type="submit"
                  rounded="md"
                  className="w-full h-full !text-sm"
                  disabled={status === 'Approved' || status === 'Approved Late'}
                  loading={tasks.update_task_loading}
                  loadingText="Updating"
                >
                  Update
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminTaskModal;
