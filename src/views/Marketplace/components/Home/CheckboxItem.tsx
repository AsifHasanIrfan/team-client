const CheckboxItem = ({
  label,
  text,
  setCategoryQuery,
  categoryQuery,
  value,
}: any) => {
  const handleChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      if (!categoryQuery?.find((item: any) => item === value)) {
        setCategoryQuery([...categoryQuery, value]);
      }
    } else {
      setCategoryQuery(categoryQuery?.filter((e: any) => e !== value));
    }
  };

  return (
    <>
      <div className="custom-checkbox" role="button">
        <label
          htmlFor={label}
          className="login-checkbox block relative top-0 pl-8 cursor-pointer text-base"
        >
          <span className="hover:text-red relative top-[1.5px]">{label}</span>
          <input
            type="checkbox"
            id={label}
            value={value}
            onChange={handleChange}
            checked={categoryQuery.find((item: any) => item === value)}
            className="absolute opacity-[0] cursor-pointer h-0 w-0"
          />
          <span className="checkmark absolute top-0 left-0 h-6 w-6 bg-[#FFF] border rounded-[6px] border-[#ccc] after:content-[''] after:absolute after:hidden after:left-[8px] after:top-[4px] after:w-[6px] after:h-[10px] after:border-[#FFF] after:border-[0_2.5px_2.5px_0]"></span>
        </label>
      </div>
    </>
  );
};

export default CheckboxItem;
