import Modal from '@components/Modal';
import { leaderboardSelectData } from '@config/constants';
import {
  GetTeamAPIRequestDataTypeProp,
  leaderboardSelectDataType,
} from '@config/types';
import { useAppSelector } from '@hooks/useRedux';
import { useEffect, useId, useState } from 'react';
import Select from 'react-select';
import LeaderboardCard from '../LeaderboardCard';
import MyProfileInfoCard from '../MyProfileInfoCard';

type Props = {
  datas: GetTeamAPIRequestDataTypeProp[];
  profileData: any;
  setProfileData: any;
};

const LeaderboardSection = ({ datas, profileData, setProfileData }: Props) => {
  // global states
  const { online } = useAppSelector((state) => state);

  // states
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(datas);
  const [selectedOption, setSelectedOption] =
    useState<leaderboardSelectDataType>({
      title: 'All Team Members',
      value: '',
    });

  // set data state by filter
  useEffect(() => {
    if (selectedOption.value) {
      if (selectedOption.value === 'Team Leader') {
        setFilteredData(
          datas.filter((item) => item.workingAs === selectedOption.value)
        );
      } else {
        setFilteredData(
          datas.filter(
            (item) =>
              item.designation.toLowerCase() ===
              selectedOption.value.toLowerCase()
          )
        );
      }
    } else {
      setFilteredData(datas);
    }
  }, [datas, selectedOption]);

  useEffect(() => {
    if (filteredData?.length > 0) {
      const matched = filteredData?.filter((e: any) => online.includes(e._id));
      const not_matched = filteredData?.filter(
        (e: any) => !online.includes(e._id)
      );

      setFilteredData([...matched, ...not_matched]);
    }
  }, [online]);

  // select style
  const style = {
    control: (base: any, state: any) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      padding: '16px 15px',
      cursor: 'pointer',
      borderBottom: '1px solid #E9EBEB',
      backgroundColor: state.isSelected ? '#C10206' : 'transparent',
      color: state.isSelected ? 'white' : 'initial',
      '&:hover': {
        backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
        color: state.isSelected ? 'white' : 'initial',
      },
    }),
  };

  return (
    <div className="bg-white rounded-xl lg:rounded-[20px] tasksPage-shadow p-[15px] md:p-[25px] lg:p-[30px] leaderboard">
      {/* Leaderboard Header --Start-- */}
      <div className="flex justify-between items-center gap-2.5">
        <h2 className="text-sm sm:text-[16px] md:text-[22px] lg:text-[25px] lg:leading-[30px] font-medium text-black">
          Digital Gregg Team
        </h2>

        {/* ================ leaderboard filter ========================= */}
        <Select
          defaultValue={leaderboardSelectData[0]}
          className="rs-custom md:w-[250px] w-[200px]"
          classNamePrefix="rs-custom"
          styles={style}
          value={selectedOption}
          isSearchable={false}
          onChange={(option: any) => setSelectedOption(option)}
          options={leaderboardSelectData}
          instanceId={useId()}
          formatOptionLabel={({ title }: { title: string }) => <>{title}</>}
        />
      </div>
      {/* Leaderboard Header --End-- */}

      {/* Leaderboard Cards --Start-- */}
      <div
        className={`mt-5 md:mt-[30px]  ${filteredData?.length === 0
          ? 'text-center text-primary'
          : 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-[20px] justify-items-center'
          }`}
      >
        {filteredData?.length > 0 ? (
          filteredData
            .filter((item) => item?.role !== 'admin')
            .map((item) => (
              <LeaderboardCard
                key={item._id}
                item={item}
                setProfileData={setProfileData}
                setOpen={setOpen}
              />
            ))
        ) : (
          <div className="">
            <p>No team member available!</p>
          </div>
        )}
      </div>
      {/* Leaderboard Cards --End-- */}

      {/* Mobile Modal ---- START ---- */}
      <div className="xl:hidden">
        <Modal setOpen={setOpen} open={open}>
          <MyProfileInfoCard data={profileData} />
        </Modal>
      </div>
      {/* Mobile Modal ---- END ---- */}
    </div>
  );
};

export default LeaderboardSection;
