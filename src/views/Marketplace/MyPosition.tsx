import useApplyProjects from '@hooks/useApplyProjects';
import React, { useState, useEffect }from 'react';

const MyPosition = ({ data, token }: any) => {
  //states
  const [myPosition, setMyPosition] = useState([]);

  //hooks
  const { applyProjects } = useApplyProjects(token, `marketplaceId=${data?.marketplaceId?._id}`);

  // sorting data by dg coin
  useEffect(() => {
    setMyPosition(
      applyProjects?.datas?.sort(function (a: any, b: any) {
        return b.biddingAmount - a.biddingAmount;
      })
    );
  }, [applyProjects?.datas]);

  return (
    <>
      {myPosition?.map((item: any, i: any) => {
        if (item.user._id === data.user._id) {
          if(i === 0) {
            return <span key={i}> 1st</span>
          } else if (i === 1) {
            return <span key={i}> 2nd</span>
          } else if (i === 2) {
            return <span key={i}> 3rd</span>
          } else {
            return <span key={i}> {i + 1}th</span>;
          }
        }
      })}
    </>
  );
};

export default MyPosition;