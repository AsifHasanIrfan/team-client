import { useQuery } from "react-query";

const useDgsById = (token: any, id: any) => {

    const { data: dgs, isLoading, refetch } = useQuery(['dgsById', token], () =>
        fetch(`${process.env.serverUrl}dg/${id}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { dgs, dgsLoading: isLoading, dgsFetch: refetch };
}

export default useDgsById;