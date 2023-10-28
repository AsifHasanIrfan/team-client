import Button from '@components/Button';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { BsFillCircleFill } from 'react-icons/bs';
import Link from 'next/link';
import classNames from 'classnames';

type Props = {
  classNameGsap: boolean;
  data: any;
}

const CareerCard = ({
  data,
}: Props) => {
  return (
    <div
      className={classNames(
        'bg-white px-[30px] py-[25px] rounded-lg my-5'
      )}
    >
      <div className="md:grid lg:grid-cols-2 md:grid-cols-[38%_62%] flex flex-wrap items-center">
        <p className="text-sm font-medium md:text-base">{data?.title}</p>

        <div className="flex flex-wrap items-center justify-between w-full">
          <p className="flex items-center gap-2 text-base font-normal lg:text-base md:text-sm md:my-0 md:font-medium my-7">
            <BsFillCircleFill className="block md:hidden" />
            {data?.openPostiton > 1 ? data.openPostiton + ' positions available' : data.openPostiton + ' position available'}
          </p>
          <p className="flex items-center gap-2 text-base font-normal lg:text-base md:text-sm md:font-medium md:my-0 my-7 capitalize">
            <BsFillCircleFill className="block md:hidden" />
            {data?.jobPlaceType}
          </p>
          <Link href="/apply">
            <a>
              <Button
                className="w-full md:w-max"
                endIcon={<BsArrowRight />}
              >
                Apply
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
