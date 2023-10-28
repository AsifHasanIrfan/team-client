import { useQuery } from "react-query";

const useBenefitsUser = (token: string) => {
    const {
        data: benefitsUsers,
        isLoading,
        refetch,
    } = useQuery(['benefitsUsers', token], () =>
        fetch(`${process.env.serverUrl}user/benefit`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json())
    );

    return { benefitsUsers, benefitsUsersLoading: isLoading, benefitsUsersFetch: refetch };
};

export default useBenefitsUser;