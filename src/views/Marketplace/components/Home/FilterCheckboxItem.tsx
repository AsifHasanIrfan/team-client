// w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"

const FilterCheckboxItem = ({ text, setCategoryQuery, categoryQuery, value }: any) => {

  const handleChange = (e: any) => {
    const { value, checked } = e.target;

    if (checked) {
      if (!categoryQuery.find((item: any) => item === value)) {
        setCategoryQuery([...categoryQuery, value])
      }
    } else {
      setCategoryQuery(categoryQuery.filter((e: any) => e !== value))
    }
  }

  return (
    <li className="flex flex-row pt-[25px] items-center gap-[12px]">
      <input
        type="checkbox"
        id={text}
        value={value}
        onChange={handleChange}
        className="w-[24px] h-[24px] text-orange-500 bg-gray-100 rounded border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor={text}>{text}</label>
    </li>
  );
};

export default FilterCheckboxItem;
