import CrownIcon from '@components/Icons/CrownIcon';
import React from 'react'

type Props = {
  currentApplication: any;
};

const Current = ({ currentApplication }: Props) => {

  return (
    <div className="rounded-[20px] bg-[#FFFFFF] tasksPage-shadow h-max p-[20px] order-1 lg:order-none">
      <h3 className="font-medium text-[18px] py-[20px]">
        Current Applications
      </h3>
      <hr />

      {currentApplication?.length === 0 && <h2 className="mt-3 text-center text-primary">No one bided yet</h2>}

      <table className="w-full">
        <tbody>
          {currentApplication?.length > 0 && (
            currentApplication?.slice(0, 3)?.map((item: any, index: number) => (
              <tr
                className="border-b border-b-slate-300 last:border-b-0"
                key={index}
              >
                <td className="w-9/12 py-[22px]">
                  {index === 0 && (
                    <span className="flex items-center gap-2 text-[#454545] font-semibold">
                      <CrownIcon /> 1st Place
                    </span>
                  )}
                  {index === 1 && '2nd Place'}
                  {index === 2 && '3rd Place'}
                </td>
                <td className="w-3/12 py-[22px]">{item?.user?.firstName.split(" ")[0] !== undefined ? item?.user?.firstName.split(" ")[0] : item?.user?.firstName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Current;