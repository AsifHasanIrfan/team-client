import { useQuery } from 'react-query';

const useSalaryInfo = (token: string, id: string) => {
  const {
    data: salaryInfo,
    isLoading,
    refetch,
  } = useQuery(
    ['salaryInfo', token, id],
    () =>
      fetch(`${process.env.serverUrl}current-prev/${id}`, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
  );

  return { salaryInfo, salaryInfoLoading: isLoading, salaryInfoFetch: refetch };
};

export default useSalaryInfo;
