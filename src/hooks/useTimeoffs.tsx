import { useQuery } from "react-query";

const useTimeoffs = (token: any) => {

    const { data: timeoffs, isLoading, refetch } = useQuery(['timeoff', token], () =>
        fetch(`${process.env.serverUrl}timeoff`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { timeoffs, timeoffsLoading: isLoading, timeoffsFetch: refetch };
}

export default useTimeoffs;