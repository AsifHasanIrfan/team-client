import Button from '@components/Button';
import Modal from '@components/Modal';
import { jobCategoryDatas, jobPlaceDatas } from '@config/constants';
import useJobs from '@hooks/useJobs';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  token: string;
};

const CreateJobModal = ({ open, setOpen, token }: Props) => {
  // hooks
  const { jobsFetch } = useJobs(token);

  // states
  const initState = {
    title: '',
    openPostiton: 0,
    jobPlaceType: jobPlaceDatas[0].value,
    category: jobCategoryDatas[0].value,
  };

  const [data, setData] = useState({ ...initState });
  const [loading, setLoading] = useState(false);

  // get selected option
  const [selectedPlaceOption, setSelectedPlaceOption] = useState(
    jobPlaceDatas[0]
  );
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(
    jobCategoryDatas[0]
  );

  // select style
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

  const handleJobSubmit = (e: any) => {
    e.preventDefault();

    // checking user working as is selected
    if (data.jobPlaceType === '' || data.category === '') {
      toast.error('Required all fields!');
      return;
    }

    setLoading(true);
    axios
      .post(`${process.env.serverUrl}job`, data, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }
        if (response.data.success === true) {
          jobsFetch();
          setOpen(false);
          toast.success(response.data.message);
          setData({ ...initState });
        }
      });
  };

  return (
    <Modal open={open} setOpen={setOpen} title={'Create Job'}>
      <div className="w-[330px] md:w-[500px] xl:w-[850px] job__createModal">
        <form onSubmit={handleJobSubmit}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5">
            <div className={`w-full mb-[20px] md:col-span-2 col-span-1`}>
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Title
              </h2>

              <div className="w-full overflow-hidden h-[70px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative  mb-[15px] ">
                <input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  type="text"
                  required
                  placeholder="ex: React Developer"
                  className="w-full h-full border-none outline-none"
                />
              </div>
            </div>

            <div className={`w-full mb-[20px] col-span-1`}>
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Place Type
              </h2>

              <div className="w-full h-[70px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative  mb-[15px] ">
                <Select
                  defaultValue={jobPlaceDatas[0]}
                  options={jobPlaceDatas}
                  styles={customStyle}
                  value={selectedPlaceOption}
                  id="selectbox"
                  instanceId="selectbox"
                  isSearchable={false}
                  onChange={(option: any) => {
                    setSelectedPlaceOption(option);
                    setData({ ...data, jobPlaceType: option.value });
                  }}
                  formatOptionLabel={({ title }: { title: string }) => (
                    <>{title}</>
                  )}
                />
              </div>
            </div>

            <div className={`w-full mb-[20px] col-span-1`}>
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Category
              </h2>

              <div className="w-full h-[70px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative  mb-[15px] ">
                <Select
                  defaultValue={jobCategoryDatas[0]}
                  options={jobCategoryDatas}
                  styles={customStyle}
                  value={selectedCategoryOption}
                  id="selectbox"
                  instanceId="selectbox"
                  isSearchable={false}
                  onChange={(option: any) => {
                    setSelectedCategoryOption(option);
                    setData({ ...data, category: option.value });
                  }}
                  formatOptionLabel={({ title }: { title: string }) => (
                    <>{title}</>
                  )}
                />
              </div>
            </div>

            <div className={`w-full mb-[20px] md:col-span-2 col-span-1`}>
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Open Position
              </h2>

              <div className="w-full overflow-hidden h-[70px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative  mb-[15px] ">
                <input
                  value={data.openPostiton}
                  onChange={(e) =>
                    setData({
                      ...data,
                      openPostiton: e.target && parseInt(e.target.value),
                    })
                  }
                  type="number"
                  min={1}
                  placeholder="ex: 1"
                  className="w-full h-full border-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className={`md:w-[200px] w-full h-[50px] mt-[15px] self-end`}>
              <Button
                rounded="md"
                className={`w-full h-full !text-sm !px-[15px]`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span id="button__loading" className="mr-1"></span> Creating
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateJobModal;
