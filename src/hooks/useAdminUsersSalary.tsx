import { useQuery } from 'react-query';

const useAdminUsersSalary = (token: string, id: string) => {
    const {
        data: adminSalaryInfo,
        isLoading,
        refetch,
    } = useQuery(
        ['userssalary', token, id],
        () =>
            fetch(`${process.env.serverUrl}digitalgregg/${id}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
    );

    return { adminSalaryInfo, adminSalaryInfoLoading: isLoading, adminSalaryInfoFetch: refetch };
};

export default useAdminUsersSalary;
