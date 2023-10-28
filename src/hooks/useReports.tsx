import { useQuery } from "react-query";

const useReports = (token: any) => {

    const { data: reports, isLoading, refetch } = useQuery(['reports', token], () =>
        fetch(`${process.env.serverUrl}reports`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { reports, reportsLoading: isLoading, reportsFetch: refetch };
}

export default useReports;