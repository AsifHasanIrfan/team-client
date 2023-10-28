import TeamRDModal from '@views/Team/partials/TeamRDModal';
import React, { useState } from 'react'

type Props = {
    isAdmin: boolean;
    token: any;
    teamRewardFetch: any;
    fDatas: any;
}

const TeamRD = ({ isAdmin, token, teamRewardFetch, fDatas }: Props) => {

    // states
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-[20px] 3xl:p-5 p-5 tasksPage-shadow md:mt-[30px] xl:mt-[15px] 2xl:mt-[30px]">

                <div className='flex items-center justify-between'>
                    <h4 className="text-[18px] xl:text-sm 3xl:text-[18px] leading-[21px] font-medium">
                        Team Monthly Rewards
                    </h4>

                    {isAdmin ? <button
                        onClick={() => setOpen(true)}
                        className=' text-primary leading-[19px] font-normal text-base cursor-pointer decoration-primary hover:text-red transition ease-in-out duration-300'>Edit</button> : null}
                </div>


                <div className={`mt-5 space-y-[15px]`}>
                    <p className='rounded-lg border-l-[3px] border-primary bg-[#F3F3F3] 3xl:p-[15px_8px] xl:px-[3px] xl:pr-[5px] p-[15px_8px]'>Team Reward Amount: <br /> <span className='font-bold'>{fDatas[0]?.rewardAmount ? fDatas[0]?.rewardAmount : 'n/a'} DG Coins</span></p>

                    <p className='rounded-lg border-l-[3px] border-primary bg-[#F3F3F3] 3xl:p-[15px_8px] xl:px-[3px] xl:pr-[5px] p-[15px_8px]'>Team Drawback Amount: <br /> <span className='font-bold'>{fDatas[0]?.drawbackAmount ? fDatas[0]?.drawbackAmount : 'n/a'} DG Coins</span></p>

                    <p className='rounded-lg border-l-[3px] border-primary bg-[#F3F3F3] 3xl:p-[15px_8px] xl:px-[3px] xl:pr-[5px] p-[15px_8px]'>Additional Drawback Amount: <br /> <span className='font-bold'>{fDatas[0]?.additionalDrawbackAmount ? fDatas[0]?.additionalDrawbackAmount : 'n/a'} DG Coins</span></p>
                </div>
            </div>

            <TeamRDModal
                open={open}
                setOpen={setOpen}
                token={token}
                fDatas={fDatas}
                teamRewardFetch={teamRewardFetch}
            />
        </>
    )
}

export default TeamRD