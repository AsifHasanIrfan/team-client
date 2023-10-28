import DgCoinIcon from '@components/Icons/DgCoinIcon'
import React from 'react'

type Props = {
    data: {
        totalThisMonthTaskCoin: number;
        totalLastMonthTaskCoin: number;
    }
}

const EarnDGByTask = ({ data }: Props) => {
    return (
        <div className='mt-3 mb-4'>
            <div className='px-5 py-[18px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative cursor-default'>
                <div className='flex flex-wrap lg:justify-between justify-center gap-x-[20px] gap-y-[20px] lg:gap-y-0'>
                    <div>
                        <h5 className='font-medium flex gap-2'>You received a total of Tasks DG coins this month: <span className='text-primary font-semibold flex gap-2 items-center'><span className='relative -top-[1px]'><DgCoinIcon /></span> {data?.totalThisMonthTaskCoin ? data.totalThisMonthTaskCoin : 0}</span></h5>
                    </div>
                    <div>
                        <h5 className='font-medium flex gap-2'>You received a total of Tasks DG coins last month: <span className='text-primary font-semibold flex gap-2 items-center'><span className='relative -top-[1px]'><DgCoinIcon /></span> {data?.totalLastMonthTaskCoin ? data.totalLastMonthTaskCoin : 0}</span></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EarnDGByTask