import { useQuery } from "react-query";

const useDrawbacks = (token: any, id: any) => {

    const { data: drawbacks, isLoading, refetch } = useQuery(['drawbacksUser', token], () =>
        fetch(`${process.env.serverUrl}user/drawback/${id}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { drawbacks, drawbacksLoading: isLoading, drawbacksFetch: refetch };
}

export default useDrawbacks;