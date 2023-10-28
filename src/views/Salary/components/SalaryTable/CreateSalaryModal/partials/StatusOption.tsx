import React, { useState } from 'react';
import Select from 'react-select';

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

type SalaryStatusOptionsProps = {
  values: any;
  options: any;
  defaultValue: any;
  onChange: (value: any) => void;
};

const StatusOption: React.FC<SalaryStatusOptionsProps> = ({
  values,
  options,
  defaultValue,
  onChange,
}) => {
  return (
    <Select
      id="statusSelect"
      options={options}
      defaultValue={defaultValue}
      value={values}
      onChange={onChange}
      styles={customStyle}
      isSearchable={false}
    />
  );
};
export default StatusOption;
