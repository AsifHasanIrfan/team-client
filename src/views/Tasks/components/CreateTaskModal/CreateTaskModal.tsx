import React, { useState } from 'react';
import Modal from '@components/Modal';
import { RowModal } from '@config/types';
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { VscCalendar } from 'react-icons/vsc';
import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import dayjs from 'dayjs';
import { useDetectClickOutside } from 'react-detect-click-outside';
import ReactDropZone from '../ReactDropZone';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { cx } from '@config/constants';
import { createTask } from '@redux/actions/tasks';
import moment from 'moment-timezone';

const RowModal: React.FC<RowModal> = ({ open, setOpen, dataId, members }) => {

  // global states
  const { auth, tasks, socket } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  const [startDatePicker, setStartDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState({ label: "", value: "" })

  const CreateTaskSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    dgCoin: Yup.number().required('Required'),
    dueTime: Yup.string().required("Required")
  });

  const startDateRef = useDetectClickOutside({
    onTriggered: () => setStartDatePicker(false),
  });

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

  function handleUser(selectedUser: any) {
    setUser(selectedUser)
  }

  const users_name = members?.map((e: any) => {
    return { label: `${e.firstName} ${e.lastName}`, value: e._id }
  }) || []

  // const isoDateString = new Date("2022-11-29 10:30:00").toISOString();
  // // console.log('date', isoDateString);
  // console.log()
  // const time = moment(isoDateString);
  // const displayCutoff = time
  //   .tz(moment.tz.guess())
  //   .format('YYYY-DD-MM hh:mm:ss a');
  // console.log(displayCutoff); 
  return (
    <Modal open={open} setOpen={setOpen} title={'Task Details'}>
      <div className="w-[330px] md:w-[580px] lg:w-[640px] xl:w-[850px]">
        <Formik
          initialValues={{
            title: '',
            description: '',
            dgCoin: 0,
            dueTime: "03:00:00",
          }}
          validationSchema={CreateTaskSchema}
          onSubmit={(values: any, { resetForm }: any) => {
            const formattedDate = startDate.format('YYYY-MM-DD');
            const formattedTime = moment(values.dueTime, 'hh:mm').format(
              'hh:mm:ss a'
            );
            const formattedDateAndTime = `${formattedDate} ${formattedTime}`;

            const isoDateString = new Date(formattedDateAndTime).toISOString();

            const taskData = {
              description: values.description,
              dgCoin: values.dgCoin,
              title: values.title,
              dueDateAndTime: isoDateString,
            };

            dispatch(
              createTask(
                taskData,
                files,
                user.value,
                auth.token,
                resetForm,
                socket,
                setOpen
              )
            );
            // setUser({ value: "", label: "" })
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <div className="mb-[20px] sm:mb-[30px]">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    Task Title
                  </h2>
                  <Field
                    name="title"
                    className={cx(
                      errors.title && touched.title && 'border border-[red]',
                      'outline-none w-full py-[16px] px-[20px] text-[16px] leading-[22px] border-[1px] rounded-[8px] border-[#E0E0E0] bg-[#FFFFFF]'
                    )}
                    placeholder="Add task title"
                  />

                  {errors.title && touched.title ? (
                    <div className="ml-1.5 mt-1.5 text-[red]">
                      {errors.title}
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
                    name="description"
                    className={cx(
                      errors.title && touched.title && 'border border-[red]',
                      'outline-none w-full py-[16px] px-[20px] text-[16px] leading-[22px] border-[1px] rounded-[8px] border-[#E0E0E0] bg-[#FFFFFF]'
                    )}
                    placeholder="Add task description"
                  />

                  {errors.description && touched.description ? (
                    <div className="ml-1.5 mt-1.5 text-[red]">
                      {errors.description}
                    </div>
                  ) : null}
                </div>

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
                      <p className="ml-2">{startDate.format('DD-MM-YYYY')}</p>
                      {startDatePicker && (
                        <DatePicker
                          selectedDate={startDate}
                          onChange={setStartDate}
                        />
                      )}
                      <VscCalendar className="ml-5" />
                    </div>
                  </div>

                  <div className="mb-[15px] sm:mb-[20px] w-full">
                    <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                      Due time{' '}
                    </h2>

                    <div
                      className={cx(
                        errors.dueTime &&
                        touched.dueTime &&
                        'border border-[red]',
                        'w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative'
                      )}
                    >
                      <Field
                        name="dueTime"
                        type="time"
                        className="w-full outline-none"
                      />

                      {errors.dueTime && touched.dueTime ? (
                        <div className="ml-1.5 mt-1.5 text-[red]">
                          {errors.dueTime}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mb-[15px] sm:mb-[20px] w-full">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    Select user
                  </h2>

                  <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
                    <Select
                      onChange={handleUser}
                      styles={customStyle}
                      options={users_name}
                    />
                  </div>
                </div>
                <div className="mb-[20px] sm:mb-[30px]">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    Enter DG coin
                  </h2>
                  <Field
                    type="number"
                    name="dgCoin"
                    className="outline-none w-full py-[16px] px-[20px] text-[16px] leading-[22px] border-[1px] rounded-[8px] border-[#E0E0E0] bg-[#FFFFFF]"
                    placeholder="100000"
                  />
                </div>

                <div className="space-y-3">
                  <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    Attachment{' '}
                  </h2>
                  <ReactDropZone setFiles={setFiles} />
                </div>

                <div className="gird md:mt-[40px] mt-[25px]">
                  <div className="w-full">
                    <Button
                      type="submit"
                      rounded="md"
                      disabled={user.value === ""}
                      className="w-max ml-auto h-full !text-sm"
                      loading={tasks.create_task_loading}
                      loadingText="Creating"
                    >
                      Create task
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default RowModal;
