import React from 'react';

type Props = {
  setSearchByTitle: (searchByTitle: string) => void;
};

const SearchBenefits = ({ setSearchByTitle }: Props) => {

  return (
    <div className="w-full md:w-80 items-center mb-[17px]">
      {/* Benefits Search Bar */}
      <div className="flex-1 tasksPage-shadow">
        <input
          placeholder="Search by benefit title"
          onChange={(e) => setSearchByTitle(e.target.value)}
          className="outline-none border-none w-full px-[9px] py-[12px] rounded-[10px]"
        />
      </div>
    </div>
  );
};

export default SearchBenefits;
