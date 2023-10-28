import { ReactSelectFormatProps } from '@config/types';
import Image from 'next/image';
import Select from 'react-select';

const style = {
  control: (base: any, state: any) => ({
    ...base,
    boxShadow: state.isFocused ? 0 : 0,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    padding: '12px 15px',
    cursor: 'pointer',
    borderBottom: '1px solid #E9EBEB',
    backgroundColor: 'transparent',
    color: state.isSelected ? '#C10206' : 'initial',
    '&:hover': {
      backgroundColor: '#C10206',
      color: 'white',
    },
  }),
};

const CountryOptions = ({ datas, selectedOption, setSelectedOptions }: any) => {
  return (
    <Select
      defaultValue={datas[0]}
      className="rs-custom"
      classNamePrefix="rs-custom"
      styles={style}
      value={selectedOption}
      onChange={(option: any) => setSelectedOptions(option)}
      options={datas}
      isSearchable={false}
      formatOptionLabel={({ imgUrl, label }: ReactSelectFormatProps) => (
        <div className="flex items-center gap-[11px]">
          <div className="w-[20px] h-[20px]">
            <Image
              src={imgUrl}
              width={1}
              height={1}
              layout="responsive"
              alt="flag-image"
            />
          </div>
          <div>
            <b>{label}</b>
          </div>
        </div>
      )}
    />
  );
};

export default CountryOptions;
