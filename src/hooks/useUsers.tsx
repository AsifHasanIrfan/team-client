import { useQuery } from "react-query";

const useUsers = (token: any) => {

    const { data: users, isLoading, refetch } = useQuery(['allUsers', token], () =>
        fetch(`${process.env.serverUrl}users`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { users, usersLoading: isLoading, usersFetch: refetch };
}

export default useUsers;