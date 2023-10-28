import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useProjects from '@hooks/useProjects';
import { useAppSelector } from '@hooks/useRedux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import ReactPaginate from 'react-paginate';
import JobItemCard from './components/Home/JobItemCard';
import PaginationCount from './components/Home/PaginationCount';
import SearchBar from './components/Home/SearchBar';
import SideBar from './components/Home/SideBar';
import NoResultMatched from './components/NoResultMatched/NoResultMatched';
import { sidebarMenuLinks, tabActiveStyle } from './constants';

// ava
const Prev = () => {
  return (
    <PaginationCount className="bg-[#DADADA]">
      <TbChevronLeft className="text-[20px]" />
    </PaginationCount>
  );
};

const Next = () => {
  return (
    <PaginationCount className="bg-[#DADADA]">
      <TbChevronRight className="text-[20px]" />
    </PaginationCount>
  );
};

const counterStyle =
  'rounded-[4px] text-center w-[33px] h-[32px] flex items-center justify-center cursor-pointer border border-[#DADADA] font-[600 bg-white';

const MarketplaceHome = () => {
  // global states
  const router = useRouter();
  const { auth } = useAppSelector((state) => state);

  // states
  const [categoryQuery, setCategoryQuery] = useState([]);

  // hooks
  const { projects, projectsLoading } = useProjects(auth?.token, categoryQuery);

  // states
  const [tab, setTab] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filterData, setFilterData] = useState(
    projects?.datas?.filter((item: any) => item.status === 'posted')
  );
  const itemsPerPage = 5;

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filterData?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterData?.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filterData?.length;
    setItemOffset(newOffset);
  };

  // filter active/archive data and search
  useEffect(() => {
    if (searchValue) {
      const postedProjects = projects?.datas.filter(
        (item: any) => item.status === 'posted'
      );
      setFilterData(
        postedProjects?.filter((el: any) =>
          el.title?.match(new RegExp(searchValue, 'i'))
        )
      );
    } else {
      setFilterData(
        projects?.datas.filter((item: any) => item.status === 'posted')
      );
    }
  }, [searchValue, projects?.datas]);

  const handleClick = (id: number) => {
    setTab(id);
  };

  // loader
  if (!auth.token) return <FullPageLoader />;

  return (
    <div className="flex flex-row">
      <SideBar
        handleClick={handleClick}
        tab={tab}
        categoryQuery={categoryQuery}
        setCategoryQuery={setCategoryQuery}
      />

      <div className="w-full lg:ml-[30px]">
        <div className="flex items-center gap-[30px] my-[15px] lg:hidden">
          {sidebarMenuLinks.map((item) => (
            <Link href={item.url} passHref key={item.id}>
              <span
                key={item.id}
                className={`text-[16px] cursor-pointer font-[500] hover:text-lightHover pb-[10px] ${tab === item.id && tabActiveStyle
                  }`}
                onClick={() => handleClick(item.id)}
              >
                {item.text}
              </span>
            </Link>
          ))}
        </div>

        {/* search bar */}
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          categoryQuery={categoryQuery}
          setCategoryQuery={setCategoryQuery}
        // setIsMobileQueryActive={setIsMobileQueryActive}
        />

        <div className="pt-[30px]">
          <h4 className="text-[18px] font-[500] pb-[20px]">
            {searchValue || categoryQuery.length
              ? `${filterData?.length === undefined
                ? 'Loading...'
                : `${filterData?.length} Jobs available 
            ${searchValue ? `"${searchValue}"` : ''}`
              }`
              : 'Latest Job Posts'}
          </h4>

          {projectsLoading && <FullPageLoader />}

          {currentItems?.length === 0 ? (
            <NoResultMatched />
          ) : (
            currentItems?.map((item: any, index: number) => (
              <React.Fragment key={item._id}>
                <JobItemCard
                  data={item}
                  last={currentItems?.length - 1}
                  index={index}
                  userId={auth?.user?._id}
                />
              </React.Fragment>
            ))
          )}
        </div>
        {filterData?.length > itemsPerPage && (
          <div className="mt-[90px]">
            <ReactPaginate
              breakLabel="..."
              breakLinkClassName={counterStyle}
              pageRangeDisplayed={itemsPerPage}
              nextLabel={<Next />}
              onPageChange={handlePageClick}
              pageCount={pageCount}
              previousLabel={<Prev />}
              containerClassName={
                'pagination flex items-center justify-end gap-4'
              }
              previousLinkClassName={'block'}
              nextLinkClassName={'block'}
              disabledClassName={'pagination__link--disabled'}
              pageLinkClassName={counterStyle}
              activeLinkClassName={`font-bold border border-[#FF0032]`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceHome;
