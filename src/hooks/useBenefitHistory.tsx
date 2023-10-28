import { useQuery } from 'react-query';

const useBenefitHistory = (token: string) => {
  const {
    data: benefitHistories,
    isLoading,
    refetch,
  } = useQuery(['benefitPurchaseHistory', token], () =>
    fetch(`${process.env.serverUrl}benefit/histories`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );

  return {
    benefitHistories,
    benefitHistoriesLoading: isLoading,
    benefitHistoriesFetch: refetch,
  };
};

export default useBenefitHistory;
