import Modal from '@components/Modal';
import { categoryFilterData } from '@views/Marketplace/constants';
import { useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { GiSettingsKnobs } from 'react-icons/gi';
import { VscChromeClose } from 'react-icons/vsc';
import FilterSectionItem from './FilterSectionItem';

type Props = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  categoryQuery: any;
  setCategoryQuery: (categoryQuery: any) => void;
  setIsMobileQueryActive?: any;
};

const SearchBar = ({
  searchValue,
  setSearchValue,
  categoryQuery,
  setCategoryQuery,
}: Props) => {
  // states
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="flex flex-row items-center gap-[15px]">
      <div className="flex flex-row items-center justify-between rounded-[10px] px-[10px] w-full border-[1px] border-[#949494]">
        <div className="flex flex-row items-center gap-[12px] w-full h-full">
          <i className="text-[30px] text-[#949494]">
            <CgSearch />
          </i>
          <input
            type="text"
            value={searchValue}
            placeholder="Search projects by name"
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-[#f7f8fa] w-full h-[50px] outline-none text-[16px] caret-primary"
          />
        </div>
        {searchValue.length ? (
          <div onClick={() => setSearchValue('')}>
            <i className="text-[25px] text-[#949494] cursor-pointer hover:text-lightHover transition-all duration-300">
              <VscChromeClose />
            </i>
          </div>
        ) : (
          ''
        )}
      </div>
      <div
        className="border-[1px] border-[#949494] rounded-[10px] py-[15px] px-[16px] block lg:hidden cursor-pointer hover:border-lightHover text-[#949494] hover:text-lightHover transition-all duration-300"
        onClick={() => setOpenFilter(true)}
      >
        <i className="text-[20px]  ">
          <GiSettingsKnobs className="rotate-90" />
        </i>
      </div>
      <Modal open={openFilter} setOpen={setOpenFilter} title="Filter">
        <div className="w-[380px]">
          <FilterSectionItem
            filterData={categoryFilterData}
            categoryQuery={categoryQuery}
            setCategoryQuery={setCategoryQuery}
          />

          {/* <div className="flex items-center gap-[10px] w-full m-auto">
            <ApplyButton onClick={() => setOpenFilter(false)}>
              Cancel
            </ApplyButton>
            <ApplyButton
              onClick={applyFilter}
              className="bg-primary text-white hover:bg-lightHover hover:text-white border-none"
            >
              Apply Filter
            </ApplyButton>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default SearchBar;
