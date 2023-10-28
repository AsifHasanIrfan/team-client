import { useQuery } from "react-query";

const useTeamReward = (token: any) => {

    const { data: teamReward, isLoading, refetch } = useQuery(['teamReward', token], () =>
        fetch(`${process.env.serverUrl}team-member/rewards-drawback`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { teamReward, teamRewardLoading: isLoading, teamRewardFetch: refetch };
}

export default useTeamReward;