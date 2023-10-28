import Button from '@components/Button';
import Modal from '@components/Modal';
import { forgetPasswordDataType } from '@config/types';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { forgetPasswordRequestStatusUpdate } from '@redux/actions/forgetRequest';
import Input from '@views/Setting/Input';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: forgetPasswordDataType;
};

const options = [
  { value: '', label: 'Select' },
  { value: 'approved', label: 'Approved' },
  { value: 'decline', label: 'Declined' },
];

const ForgetPasswordModal = ({ data, open, setOpen }: Props) => {

  // distructure
  const { _id, username, email, status } = data;

  // global variable from redux
  const dispatch = useAppDispatch();
  const { auth, forgetRequest } = useAppSelector(state => state);

  // get selected option
  const [selectedOption, setSelectedOptions] = useState(options[0]);

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

  // setting selected data by status
  useEffect(() => {
    setSelectedOptions(options.find((item: any) => item.value === status) || options[0])
  }, [status])

  const handleForgetPasswordStatus = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const sendData = { status: selectedOption.value }

    // checking is status null
    if (sendData.status === '') {
      toast.error('Please change the status!');
      return;
    }

    dispatch(forgetPasswordRequestStatusUpdate(sendData, auth.token, _id, setOpen));
  };

  return (
    <Modal open={open} setOpen={setOpen} title={'Forget Password Request'}>
      <div className="w-[330px] md:w-[500px] xl:w-[850px]">
        <form onSubmit={handleForgetPasswordStatus}>
          <div className="mb-[15px] sm:mb-[20px] w-full">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
              Forget Password Request
            </h2>
          </div>

          <div className="w-full flex items-center flex-wrap md:flex-nowrap gap-x-[18px] xl:gap-x-[20px]">
            <div className="w-full md:w-1/2 mb-[20px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                Username
              </h2>

              <Input value={username} readOnly className="text-lg" />
            </div>

            <div className="w-full md:w-1/2 mb-[20px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                Email
              </h2>

              <Input value={email} readOnly className="text-lg" />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
              Request Status
            </h2>
            <div className="p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
              <Select
                defaultValue={options.find(item => item.value === status)}
                options={options}
                isSearchable={false}
                styles={customStyle}
                isDisabled={status === 'approved' || status === 'decline'}
                id="selectbox"
                instanceId="selectbox"
                onChange={(option: any) => {
                  setSelectedOptions(option);
                }}
              />
            </div>
          </div>

          {status === 'progress' && <div className="flex justify-end mt-[40px]">
            <div className="md:w-[155px] w-full h-[50px] shrink-0 self-end">
              <Button
                rounded="md"
                className="w-full h-full !text-sm !px-[15px]"
                disabled={selectedOption.value === ''}
                loading={forgetRequest.forget_request_update_loading}
                loadingText={'Updating'}
              >
                Update
              </Button>
            </div>
          </div>}


        </form>
      </div>
    </Modal>
  );
};

export default ForgetPasswordModal;
