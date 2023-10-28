import { useQuery } from "react-query";

const useAttendances = (token: string, query: any, userId: any) => {
  const {
    data: attendances,
    isLoading,
    refetch,
  } = useQuery(['attendances', token, userId, query], () =>
    fetch(
      `${process.env.serverUrl}attendance?today=${query}&userId=${userId}`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json())
  );

  return { attendances, attendancesLoading: isLoading, attendancesFetch: refetch };
};

export default useAttendances;