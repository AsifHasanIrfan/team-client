import React from 'react'
import Select from 'react-select';

type Props = {
    selectedOption: any;
    setSelectedOption: any;
    options: any;
    label: any;
};

export const customStyle = {
    control: (provided: any) => ({
        ...provided,
        height: 0,
        minHeight: '37px',
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

const ReportSelect = ({ label, selectedOption, setSelectedOption, options, }: Props) => {
    return (
        <div className="flex flex-col w-full h-[60px]">
            <label className="font-medium text-base leading-6 mb-2.5">
                {label ? label : 'label'}
            </label>
            <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] h-[58px]">
                <Select
                    defaultValue={selectedOption}
                    value={selectedOption}
                    onChange={(option: any) => setSelectedOption(option)}
                    options={options}
                    // isSearchable={false}
                    formatOptionLabel={({ title }: { title: string }) => (
                        <div className="flex items-center gap-[11px]">
                            <p>{title}</p>
                        </div>
                    )}
                    styles={customStyle}
                />
            </div>
        </div>
    )
}

export default ReportSelect