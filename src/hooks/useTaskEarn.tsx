import { useQuery } from "react-query";

const useTaskEarn = (token: any, id: any) => {

    const { data: taskEarn, isLoading, refetch } = useQuery(['taskEarn', token, id], () =>
        fetch(`${process.env.serverUrl}task-earn/${id}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { taskEarn, taskEarnLoading: isLoading, taskEarnFetch: refetch };
}

export default useTaskEarn;