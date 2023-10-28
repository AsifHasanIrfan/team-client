import { useQuery } from "react-query";

const useAdminUsers = (token: any) => {

    const { data: adminUsers, isLoading, refetch } = useQuery(['adminUsers', token], () =>
        fetch(`${process.env.serverUrl}admin/users`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { adminUsers, adminUsersLoading: isLoading, adminUsersFetch: refetch };
}

export default useAdminUsers;