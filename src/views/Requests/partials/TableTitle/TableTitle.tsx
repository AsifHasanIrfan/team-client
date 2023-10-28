import { cx } from '@config/constants'
import React from 'react'

type Props = {
    pageTitle: string;
    filterBy: string;
    value: string;
    setFilterBy: (filterBy: string) => void;
    setValue: (value: string) => void;
    isSearchFieldRequired: boolean;
    isFilterTabRequired: boolean;
}

const TableTiltle = ({ pageTitle, setFilterBy, filterBy, value, setValue, isSearchFieldRequired, isFilterTabRequired }: Props) => {
    return (
        <div className={`${isSearchFieldRequired && 'flex justify-between items-center mb-4 gap-5'}`}>

            <div className={`w-full flex md:flex-row flex-col md:items-center md:gap-5 gap-1 ${!isSearchFieldRequired && 'mb-[13px]'}`}>
                <h2 className={cx('md:text-[24px] text-[16px] font-medium leading-[34px]')}>
                    {pageTitle}
                </h2>

                {isFilterTabRequired && <div className='flex gap-[10px]'>
                    <button type="button"
                        onClick={() => {
                            setFilterBy('progress');
                            setValue('');
                        }}
                        className={`md:text-[20px] text-[16px] outline-none font-medium text-[#CCCCCC] hover:text-primary transition ease-in-out duration-300 ${filterBy === 'progress' && '!text-primary'} }`}
                    >
                        Pending
                    </button>
                    <button type="button"
                        onClick={() => {
                            setFilterBy('approved');
                            setValue('');
                        }}
                        className={`md:text-[20px] text-[16px] outline-none font-medium text-[#CCCCCC] hover:text-primary transition ease-in-out duration-300 ${filterBy === 'approved' && '!text-primary'} }`}
                    >
                        Approved
                    </button>
                    <button type="button"
                        onClick={() => {
                            setFilterBy('decline');
                            setValue('');
                        }}
                        className={`md:text-[20px] text-[16px] outline-none font-medium text-[#CCCCCC] hover:text-primary transition ease-in-out duration-300 ${filterBy === 'decline' && '!text-primary'} }`}
                    >
                        Decline
                    </button>
                </div>}

            </div>

            {isSearchFieldRequired && <div>
                {/* ================ request search ========================= */}
                <input
                    id='search'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Search by username'
                    className={`focus:outline-none rounded-[8px] border border-[#E0E0E0] w-full md:w-[250px] lg:w-[300px]  py-3 px-5`}
                />
                {/* ================ request search ========================= */}
            </div>}

        </div>

    )
}

export default TableTiltle