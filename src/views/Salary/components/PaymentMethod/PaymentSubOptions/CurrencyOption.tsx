import React from 'react';
import Select from 'react-select';

const CurrencyOption: React.FC = () => {
  const options = [
    { value: 'bitcoin', label: 'Bitcoin' },
    { value: 'litecoin', label: 'Liteoin' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'dogecoin', label: 'Dogecoin' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'avalanche', label: 'Avalanche' },
    { value: 'usdc', label: 'USDC' },
  ];

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
      backgroundColor: 'transparent',
      color: state.isSelected ? '#C10206' : 'initial',
      '&:hover': {
        backgroundColor: '#C10206',
        color: 'white',
      }
    }),
  };

  return (
    <div className="mt-[22px]">
      <Select
        className='rs-custom'
        classNamePrefix="rs-custom"
        defaultValue={options[0]}
        options={options}
        styles={style}
      />
    </div>
  );
};

export default CurrencyOption;
