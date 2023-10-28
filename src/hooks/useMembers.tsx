import { useQuery } from "react-query";

const useMembers = (token: any) => {

    const { data: members, isLoading, refetch } = useQuery(['members', token], () =>
        fetch(`${process.env.serverUrl}members`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { members, membersLoading: isLoading, membersFetch: refetch };
}

export default useMembers;