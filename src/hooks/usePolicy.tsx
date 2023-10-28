import { useQuery } from "react-query";

const usePolicy = (token: any) => {

    const { data: policy, isLoading, refetch } = useQuery(['policy', token], () =>
        fetch(`${process.env.serverUrl}privacy-policy`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { policy, policyLoading: isLoading, policydFetch: refetch };
}

export default usePolicy;