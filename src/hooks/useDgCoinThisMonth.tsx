import { useQuery } from "react-query";

const useDgCoinThisMonth = (token: any, id: any) => {

    const { data: dgThisMonth, isLoading, refetch } = useQuery(['dgThisMonth', token, id], () =>
        fetch(`${process.env.serverUrl}dg-coin-this-month/${id}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { dgThisMonth, dgThisMonthLoading: isLoading, dgThisMonthFetch: refetch };
}

export default useDgCoinThisMonth;