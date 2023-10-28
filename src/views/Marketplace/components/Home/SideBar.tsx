import {
  categoryFilterData,
  sidebarMenuLinks,
} from '@views/Marketplace/constants';
import Link from 'next/link';
import FilterSectionItem from './FilterSectionItem';
import MenuItem from './MenuItem';

type PropsType = {
  handleClick: Function;
  tab: number;
  categoryQuery: any;
  setCategoryQuery: (categoryQuery: any) => void;
};

const SideBar = ({
  handleClick,
  tab,
  setCategoryQuery,
  categoryQuery,
}: PropsType) => {
  return (
    <div className="lg:block hidden">
      <div className="w-[223px] bg-white rounded-[10px] p-[20px] mb-[20px]">
        <ul>
          {sidebarMenuLinks.map((item) => (
            <Link href={item.url} passHref key={item.id}>
              <MenuItem
                // key={item.id}
                icon={item.icon}
                text={item.text}
                isActive={tab === item.id}
                onClick={() => handleClick(item.id)}
              />
            </Link>
          ))}
        </ul>
      </div>
      <div className="w-[223px] bg-white rounded-[10px] p-[30px]">
        <h3 className="text-[20px] font-[500] line-[23px] pb-[15px]  border-b border-[#DADADA]">
          Filter
        </h3>
        <FilterSectionItem
          filterData={categoryFilterData}
          categoryQuery={categoryQuery}
          setCategoryQuery={setCategoryQuery}
        />
      </div>
    </div>
  );
};

export default SideBar;
