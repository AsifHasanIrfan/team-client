import React from 'react';
import Select from 'react-select';

const customStyle = {
    control: (provided: any) => ({
        ...provided,
        height: 0,
        maxHeight: '33px',
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

type SelectUserProps = {
    // values?: any;
    options?: any;
    id?: any;
    defaultValue?: any;
    label?: any;
    onChange: (value: any) => void;
};

const SelectTimeoff: React.FC<SelectUserProps> = ({
    // values,
    options,
    defaultValue,
    onChange,
    label,
    id,
}) => {
    return (
        <div className="mb-[15px] sm:mb-[20px] w-full">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                {label}
            </h2>

            <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
                <Select
                    onChange={onChange}
                    styles={customStyle}
                    options={options}
                    defaultValue={defaultValue}
                    isSearchable={false}
                />
            </div>
        </div>
    );
};
export default SelectTimeoff;
