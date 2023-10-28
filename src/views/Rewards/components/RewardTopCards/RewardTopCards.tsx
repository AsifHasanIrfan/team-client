import { GetTeamAPIRequestDataTypeProp } from '@config/types';
import RewardEarnCard from '@views/Rewards/partials/RewardEarnCard';
import RewardLevelCard from '@views/Rewards/partials/RewardLevelCard';
import RewardTokenCard from '@views/Rewards/partials/RewardTokenCard';
import React from 'react';

type Props = {
    user: GetTeamAPIRequestDataTypeProp;
}

const RewardTopCards = ({ user }: Props) => {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:gap-[30px] gap-[20px] mt-5'>
            <RewardLevelCard />
            <RewardEarnCard />

            {/* total token */}
            <RewardTokenCard
                tokenAmount={user?.dgCoin ? user.dgCoin : 0}
            />
        </div>
    );
};

export default RewardTopCards;