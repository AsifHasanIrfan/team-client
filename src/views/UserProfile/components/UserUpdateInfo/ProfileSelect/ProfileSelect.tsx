import { ReactSelectFormatProps } from '@config/types';
import Image from 'next/image';
import Select from 'react-select';

type Props = {
  selectedOption: any;
  setSelectedOption: any;
  options: any;
  paymentSelect?: boolean;
  label?: string;
};

const ProfileSelect = ({
  selectedOption,
  options,
  setSelectedOption,
  paymentSelect,
  label,
}: Props) => {
  // select style
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
      backgroundColor: state.isSelected ? '#C10206' : 'transparent',
      color: state.isSelected ? 'white' : 'initial',
      '&:hover': {
        backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
        color: state.isSelected ? 'white' : 'initial',
      },
    }),
  };

  return (
    <div className="flex flex-col mb-8 w-full h-[60px]">
      <label className="font-medium text-base leading-6 mb-2.5">
        {label ? label : 'label'}
      </label>
      <div className="w-full h-full p-[5px] xl:py-[9px] xl:px-[10px] border text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0]">
        {paymentSelect ? (
          <Select
            defaultValue={selectedOption}
            styles={style}
            value={selectedOption}
            onChange={(option: any) => setSelectedOption(option)}
            options={options}
            isSearchable={false}
            formatOptionLabel={({
              imgUrl,
              label,
              subText,
            }: ReactSelectFormatProps) => (
              <div className="flex items-center gap-[11px]">
                <div className="w-[20px] h-[20px]">
                  <Image
                    src={imgUrl}
                    width={1}
                    height={1}
                    layout="responsive"
                    alt="method-image"
                  />
                </div>

                <div>
                  <b>{label}</b> <i>{subText}</i>
                </div>
              </div>
            )}
          />
        ) : (
          <Select
            defaultValue={selectedOption}
            value={selectedOption}
            onChange={(option: any) => setSelectedOption(option)}
            options={options}
            isSearchable={false}
            formatOptionLabel={({ title }: { title: string }) => (
              <div className="flex items-center gap-[11px]">
                <p>{title}</p>
              </div>
            )}
            styles={style}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileSelect;
