import { useQuery } from 'react-query';

const useGetConversion = (token: any) => {
  const {
    data: conversions,
    isLoading: conversionLoading,
    refetch: conversionRefetch,
    isSuccess,
  } = useQuery(['conversions', token], () =>
    fetch(`${process.env.serverUrl}conversion`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );
  return { conversions, conversionLoading, conversionRefetch, isSuccess };
};

export default useGetConversion;
