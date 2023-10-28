import { useQuery } from "react-query";

const useAchievementsById = (token: any, id: any) => {

    const { data: achievements, isLoading, refetch } = useQuery(['achievementsById', token], () =>
        fetch(`${process.env.serverUrl}achievement/${id}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { achievements, achievementsLoading: isLoading, achievementsFetch: refetch };
}

export default useAchievementsById;