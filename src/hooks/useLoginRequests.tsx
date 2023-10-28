import { useQuery } from "react-query";

const useLoginRequests = (token: any) => {

    const { data: requestLogins, isLoading, refetch } = useQuery(['loginRequests', token], () =>
        fetch(`${process.env.serverUrl}request-login`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { requestLogins, requestLoginsLoading: isLoading, requestLoginsFetch: refetch };
}

export default useLoginRequests;