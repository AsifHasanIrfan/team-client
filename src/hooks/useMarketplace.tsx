import { useQuery } from 'react-query';

const useMarketplace = (token: string, id: any) => {
  const {
    data: marketplace,
    isLoading,
    refetch,
  } = useQuery(['singleMarketplace', token, id], () =>
    fetch(`${process.env.serverUrl}marketplace/${id}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );

  return {
    marketplace,
    marketplaceLoading: isLoading,
    marketplaceFetch: refetch,
  };
};

export default useMarketplace;
