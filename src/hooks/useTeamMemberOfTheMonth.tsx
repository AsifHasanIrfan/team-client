import { useQuery } from "react-query";

const useEMP = (token: any) => {

    const { data: emps, isLoading, refetch } = useQuery(['emps', token], () =>
        fetch(`${process.env.serverUrl}employee-of-the-month`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { emps, empsLoading: isLoading, empsFetch: refetch };
}

export default useEMP;