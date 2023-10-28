import useDgCoinThisMonth from '@hooks/useDgCoinThisMonth';
import React from 'react'

type Props = {
    data: any;
    token: any;
}

const CoinsThisMonth = ({ data, token }: Props) => {
    const { dgThisMonth } = useDgCoinThisMonth(token, data._id);
    return dgThisMonth?.coin ? dgThisMonth?.coin : 0;
}

export default CoinsThisMonth