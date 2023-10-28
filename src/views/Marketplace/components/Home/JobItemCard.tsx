import SubmitedIcon from '@components/Icons/SubmitedIcon';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsBriefcase, BsFileEarmarkText } from 'react-icons/bs';
import ApplyButton from './ApplyButton';
import CategoryLabel from './CategoryLabel';
const parse = require('html-react-parser');

const CardActions = ({ dataId, isAlreadySubmitted }: any) => {
  const router = useRouter();

  return isAlreadySubmitted === undefined ? (
    <ApplyButton
      variant="apply"
      onClick={() => router.push(`/dashboard/marketplace/${dataId}`)}
    >
      Apply Now
    </ApplyButton>
  ) : (
    <>
      <ApplyButton
        onClick={() => router.push(`/dashboard/marketplace/details/${dataId}`)}
      >
        View Details
      </ApplyButton>
      <div className="flex flex-row items-center gap-[2px] mt-[10px]">
        <SubmitedIcon />
        <span className="text-[14px]">Application Submitted</span>
      </div>
    </>
  );
};

const JobItemCard = ({
  data,
  last,
  index,
  userId,
}: {
  data: any;
  index: number;
  last: number;
  userId: any;
}) => {
  // states
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={`bg-white p-[20px] rounded-[10px] cursor-default ${
        last !== index && 'mb-[20px]'
      }`}
    >
      <div className="flex flex-row justify-between mb-[15px]">
        <div className="">
          <CategoryLabel>{data?.category}</CategoryLabel>
          <h3 className="text-[18px] font-[600] pt-[16px] text-[#2D2B2B]">
            {data?.title}
          </h3>
          <div className="pt-[15px] pb-[5px] flex flex-row items-center text-[#454545] divide-x-[1px] divide-[#454545]">
            <div className="flex flex-row items-center gap-[6px] pr-[10px] ">
              <i>
                <BsBriefcase />
              </i>
              <span className="text-[14px] font-[500]">
                Budget: {data?.budget}$
              </span>
            </div>
            <div className="flex flex-row items-center gap-[6px] pl-[10px]">
              <i>
                <BsFileEarmarkText />
              </i>
              <span className="text-[14px] font-[500]">
                Project length: {data?.length}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <CardActions
            dataId={data._id}
            isAlreadySubmitted={data.appliedUsers.find(
              (item: any) => item === userId
            )}
          />
        </div>
      </div>
      <div>
        <p className="text-[#949494] text-[14px] pb-[10px]">
          {data?.description?.length > 283 && !showMore ? (
            <>
              {parse(data?.description.slice(0, 283))}...{' '}
              <button
                onClick={() => setShowMore(true)}
                className="text-primary cursor-pointer text-[15px] outline-none hover:text-lightHover"
              >
                Show more
              </button>
            </>
          ) : (
            <>
              {parse(data?.description)}
              {data.description.length > 283 && (
                <button
                  onClick={() => setShowMore(false)}
                  className="text-primary cursor-pointer text-[15px] outline-none hover:text-lightHover"
                >
                  Show less
                </button>
              )}
            </>
          )}
        </p>
        <span className="text-[#949494] text-[14px] ">
          Posted {moment(data?.createdAt).fromNow()}
        </span>
      </div>
      <div className="block md:hidden pt-[20px]">
        <CardActions
          dataId={data._id}
          isAlreadySubmitted={data.appliedUsers.find(
            (item: any) => item === userId
          )}
        />
      </div>
    </div>
  );
};

export default JobItemCard;
