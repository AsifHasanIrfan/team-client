import React, { useState } from 'react';
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
  values?: any;
  options?: any;
  defaultValue?: any;
  label?: any;
  onChange: (value: any) => void;
};

const SelectDrawbackType: React.FC<SelectUserProps> = ({
  values,
  options,
  defaultValue,
  onChange,
  label,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="drawbackSelect"
        className="font-medium text-base leading-6 mb-2.5"
      >
        {label}
      </label>
      <div className="flex w-full border border-[#E0E0E0] rounded-[10px]">
        <Select
          id="drawbackSelect"
          options={options}
          defaultValue={defaultValue}
          value={values}
          onChange={onChange}
          styles={customStyle}
          isSearchable={false}
        />
      </div>
    </div>
  );
};
export default SelectDrawbackType;
