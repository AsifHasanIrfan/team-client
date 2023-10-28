import { useQuery } from "react-query";

const useSalaries = (token: any) => {

    const { data: salaries, isLoading, refetch } = useQuery(['salaries', token], () =>
        fetch(`${process.env.serverUrl}salary`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { salaries, salariesLoading: isLoading, salariesFetch: refetch };
}

export default useSalaries;