import { useQuery } from "react-query";

const useTimeoffsById = (token: any, id: any) => {

    const { data: timeoffsById, isLoading, refetch } = useQuery(['timeoffById', token, id], () =>
        fetch(`${process.env.serverUrl}timeoff/${id}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { timeoffsById, timeoffsByIdLoading: isLoading, timeoffsByIdFetch: refetch };
}

export default useTimeoffsById;