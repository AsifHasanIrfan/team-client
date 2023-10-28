import CheckboxItem from './CheckboxItem';

type PropsTypes = {
  filterData: any;
  categoryQuery: any;
  setCategoryQuery: (categoryQuery: any) => void;
};

const FilterSectionItem = ({
  filterData,
  setCategoryQuery,
  categoryQuery,
}: PropsTypes) => {
  return (
    <div className="pb-[33px] pt-[20px]">
      <h4 className="text-[16px] font-[600] text-[#454545]">
        {filterData.title}
      </h4>
      <ul>
        {filterData.data.map((item: any) => (
          // <FilterCheckboxItem key={item.id} text={item.text} value={item.value} categoryQuery={categoryQuery} setCategoryQuery={setCategoryQuery} />

          <li
            className="flex flex-row pt-[25px] items-center gap-[12px]"
            key={item.id}
          >
            <CheckboxItem label={item.text} value={item.value} categoryQuery={categoryQuery} setCategoryQuery={setCategoryQuery} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSectionItem;
