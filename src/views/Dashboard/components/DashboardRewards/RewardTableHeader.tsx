import React from 'react'

type Props = {}

const RewardTableHeader = (props: Props) => {
    return (
        <div className="grid grid-cols-[82%_18%] md:grid-cols-[89%_11%] lg:grid-cols-[83%_17%] xl:grid-cols-[82%_18%] 2xl:grid-cols-[87%_13%] items-center bg-[#263238] p-[20px] cursor-default">
            <h2 className="text-[#FFF] text-sm leading-[20px] pl-1">
                Title
            </h2>

            <h2 className="text-[#FFF] text-sm leading-[20px]">
                Reward
            </h2>
        </div>
    )
}
 
export default RewardTableHeader