type Props = {
  label?: string;
  type?: string;
  value?: string;
  onChange?: any;
  isRequired?: boolean;
  placeholder?: string;
  mainCss?: string;
  name?: string;
  id?: string;
  isDisabled?: boolean;
};

const Input = ({
  label,
  type,
  value,
  onChange,
  isRequired,
  placeholder,
  mainCss,
  name,
  id,
  isDisabled,
}: Props) => {
  return (
    <div className={`w-full mb-[20px] ${mainCss}`}>
      <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
        {label}
      </h2>

      <div className="w-full overflow-hidden h-[60px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative mb-[15px]">
        <input
          value={value ? value : ''}
          onChange={onChange}
          name={name}
          type={type ? type : 'text'}
          id={name}
          required={isRequired}
          placeholder={placeholder}
          className="w-full h-full border-none outline-none"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default Input;
