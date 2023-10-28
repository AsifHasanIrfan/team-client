import Button from '@components/Button';
import Modal from '@components/Modal';
import axios from 'axios';
import React, { useState } from 'react';
import { ImAttachment } from 'react-icons/im';
import Select from 'react-select';
import fileDownload from 'js-file-download';
import CopyIcon from '@components/Icons/CopyIcon';
import toast from 'react-hot-toast';
import { useAppSelector } from '@hooks/useRedux';
import useMarketplace from '@hooks/useMarketplace';

const ViewModal = ({ open, setOpen, modalData }: any) => {
  // states
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>()

  const { auth } = useAppSelector((state) => state);
  const { marketplaceFetch } = useMarketplace(
    auth?.token,
    modalData?.marketplaceId?._id
  );

  const customStyle = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid ##E0E0E0',
      padding: '5px 10px',
      borderRadius: '8px',
      color: '#6D6D6D',
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

  const statusOptions = [
    { label: 'Approved', value: 'approved' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ]

  // download function
  const handleDownload = (url: any, filename: any) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const handleCopy = (str: any) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      toast.success('Copied Successfully');
      return navigator.clipboard.writeText(str);
    }
    return Promise.reject('The Clipboard API is not available.');
  }

  const handleSubmit = () => {
    // checking status is selected
    if (selectedStatus === undefined) {
      toast.error('Please select status')
      return
    }

    const proposalAssignData = {
      marketplaceId: modalData?.marketplaceId?._id,
      status: selectedStatus.value,
      userId: modalData?.user?._id
    };

    setLoading(true);

    axios.patch(
      `${process.env.serverUrl}proposal/update/${modalData?._id}`,
      proposalAssignData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }
        if (response.data.success === true) {
          marketplaceFetch();
          setOpen(false);
          toast.success(response.data.message);
        }
      });
  };
  return (
    <>
      <Modal
        setOpen={setOpen}
        open={open}
        title={`${modalData?.user?.firstName} ${modalData?.user?.lastName} Job proposal`}
      >
        <div className="w-[330px] md:w-[500px] xl:w-[850px]">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h2 className="font-semibold text-lg mb-2">Payment method</h2>
                <span className="font-normal text-base text-[#6D6D6D]">
                  {modalData?.paymentMethod}
                </span>
              </div>
              <div>
                {modalData?.paymentMethod === 'localBank' ? (
                  <>
                    <h2 className="font-semibold text-lg mb-2">
                      Local Bank Details
                    </h2>
                    <span className="font-normal flex justify-between gap-1 text-base text-[#6D6D6D]">
                      {modalData?.paymentNumber}
                      <span
                        onClick={() => handleCopy(modalData?.paymentNumber)}
                        className="cursor-pointer"
                      >
                        <CopyIcon />
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold text-lg mb-2">
                      {modalData?.paymentMethod} profile url
                    </h2>
                    <span className="font-normal flex justify-between gap-1 text-base text-[#6D6D6D]">
                      {modalData?.paymentURL}
                      <span
                        onClick={() => handleCopy(modalData?.paymentURL)}
                        className="cursor-pointer"
                      >
                        <CopyIcon />
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>

            <div
              className="custom-checkbox flex items-start !gap-4 mt-12 mb-8 w-max"
              role="button"
            >
              <label
                htmlFor="terms"
                className="login-checkbox block relative top-0 pl-8 cursor-pointer text-base"
              >
                Is {modalData?.user?.firstName} {modalData?.user?.lastName} wanting Digital Gregg to manage this project{' '}
                <span className="font-bold">(100% client Guaranteed)</span>
                <span className="text-primary font-bold ml-1">
                  500 DG Coins
                </span>
                <input
                  type="checkbox"
                  id="terms"
                  checked={modalData?.isDgTeamWillHandle}
                  className="absolute opacity-[0] cursor-pointer h-0 w-0"
                />
                <span className="checkmark absolute top-0 left-0 h-6 w-6 bg-[#FFF] border rounded-[6px] border-[#ccc] after:content-[''] after:absolute after:hidden after:left-[8px] after:top-[4px] after:w-[6px] after:h-[10px] after:border-[#FFF] after:border-[0_2.5px_2.5px_0]"></span>
              </label>
            </div>

            <div>
              <h4 className="font-[500] text-[18px]">
                Why {`${modalData?.user?.firstName} ${modalData?.user?.lastName}`} is perfect for this job?
              </h4>
              <textarea
                className="w-full mt-5 border outline-none py-[16px] px-[20px] border-[#E0E0E0] rounded-[8px]"
                placeholder="Type here..."
                rows={10}
                value={modalData?.whyPerfect}
                disabled
              />
            </div>

            {modalData?.attachments?.length > 0 && (
              <div className="mb-12 mt-7 ">
                {modalData?.attachments?.map(
                  ({ name, url }: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => handleDownload(url, name)}
                      className="text-[16px] leading-[22px] text-[#0075FF] cursor-pointer gap-[5px] flex items-center w-max mb-[8px]"
                    >
                      <ImAttachment fontSize={18} />
                      <p> {name} </p>
                    </div>
                  )
                )}
              </div>
            )}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center">
              <h2 className="font-semibold text-lg md:relative md:top-5">
                Total DG Coins Spent: 20 DG Coins
              </h2>
              <div>
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                  Status
                </h2>
                <Select
                  defaultValue={statusOptions.filter(
                    (item: any) => item.value === modalData?.status
                  )}
                  onChange={(option: any) => setSelectedStatus(option)}
                  styles={customStyle}
                  options={statusOptions}
                  isSearchable={false}
                  isDisabled={
                    modalData?.marketplaceId?.assignedUser
                    // modalData?.status !== 'approved' && modalData?.marketplaceId?.status === 'running'
                  }
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <div
                className={`md:w-[200px] w-full h-[50px] mt-[15px] self-end`}
              >
                <Button
                  type="button"
                  onClick={handleSubmit}
                  rounded="full"
                  className={`w-full h-full !text-sm !px-[15px]`}
                  disabled={
                    // modalData?.status !== 'approved' && modalData?.marketplaceId?.status === 'running'
                    modalData?.marketplaceId?.assignedUser || loading
                  }
                  loading={loading}
                  loadingText={'Submitting'}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ViewModal;