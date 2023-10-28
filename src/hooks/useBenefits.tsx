import { useQuery } from "react-query";

const useBenefits = (token: string) => {
  const {
    data: benefits,
    isLoading,
    refetch,
  } = useQuery(['benefits', token], () =>
    fetch(`${process.env.serverUrl}benefit`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );
    
  return { benefits, benefitsLoading: isLoading, benefitsFetch: refetch };
};

export default useBenefits;