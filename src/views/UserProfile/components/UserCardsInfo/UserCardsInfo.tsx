import React from 'react';
import Achievements from './Achievements/Achievements';
import DgCoin from './DgCoin/DgCoin';
import DrawBack from './DrawBack/DrawBack';

type Props = {
  userId: any;
  token: any;
  user: any;
}

const UserCardsInfo = ({ userId, token, user }: Props) => {
  return (
    <div className="w-full h-auto grid grid-cols-1 lg:grid-cols-3 pt-[30px] lg: gap-x-[30px] gap-y-[30px] lg:gap-y-0">

      <Achievements
        token={token}
        userId={userId}
      />

      <DgCoin
        token={token}
        userId={userId}
      />

      <DrawBack
        userId={userId}
        token={token}
      />
    </div>
  );
};
export default UserCardsInfo;
