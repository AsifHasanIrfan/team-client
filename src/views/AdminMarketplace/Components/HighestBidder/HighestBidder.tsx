import useApplyProjects from '@hooks/useApplyProjects';
import React, { useState, useEffect } from 'react';

const HighestBidder = ({ data, token }: any) => {

    //states
    const [myPosition, setMyPosition] = useState<any>([]);

    //hooks
    const { applyProjects } = useApplyProjects(token, `marketplaceId=${data?._id}`);

    // sorting data by dg coin
    useEffect(() => {
        setMyPosition(
            applyProjects?.datas?.sort(function (a: any, b: any) {
                return b.biddingAmount - a.biddingAmount;
            })
        );
    }, [applyProjects]);

    return (
        <span className={`font-semibold ${!applyProjects?.datas?.length ? '' : 'text-primary'}`}>
            {(!applyProjects?.datas?.length || !myPosition?.length) ? 'No bidder yet' : `${myPosition[0]?.user?.firstName}  ${myPosition[0]?.user?.lastName} - ${myPosition[0]?.biddingAmount} DG`}
        </span>
    );
};

export default HighestBidder;