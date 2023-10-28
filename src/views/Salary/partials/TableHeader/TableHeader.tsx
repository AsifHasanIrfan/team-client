import React from 'react'

type Props = {
    filterBy: string;
    value: string;
    setFilterBy: (filterBy: string) => void;
    setValue: (value: string) => void;
}

const TableHeader = ({ filterBy, setFilterBy, setValue, value }: Props) => {
    return (
        <div className='flex flex-col sm:flex-row justify-between items-center mb-5 gap-0 sm:gap-5'>
            <div className='flex gap-[15px] py-4 px-1'>
                <button type="button"
                    onClick={() => setFilterBy('')}
                    className={`md:text-[22px] text-[14px] outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${!filterBy && '!text-darkHover '} }`}
                >
                    All
                </button>
                <button type="button"
                    onClick={() => setFilterBy('paid')}
                    className={`md:text-[22px] text-[14px] outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterBy === 'paid' && ' !text-darkHover '} }`}
                >
                    Paid
                </button>
                <button type="button"
                    onClick={() => setFilterBy('processing')}
                    className={`md:text-[22px] text-[14px] outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterBy === 'processing' && ' !text-darkHover '} }`}
                >
                    Processing
                </button>
                <button type="button"
                    onClick={() => setFilterBy('cancel')}
                    className={`md:text-[22px] text-[14px] outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterBy === 'cancel' && ' !text-darkHover'} }`}
                >
                    Cancel
                </button>
            </div>

            <div>
                {/* ================ leaderboard search ========================= */}
                <input
                    id='search'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Search by username'
                    className={`focus:outline-none rounded-[8px] border border-[#E0E0E0] w-full md:w-[250px] lg:w-[300px]  py-3 px-5`}
                />
                {/* ================ leaderboard search ========================= */}
            </div>
        </div>

    )
}

export default TableHeader