import { useQuery } from "react-query";

const useAssignedBenefit = (token: any) => {
  const {
    data: assignedBenefits,
    isLoading,
    refetch,
  } = useQuery(['assignedBenefits', token], () =>
    fetch(`${process.env.serverUrl}benefit/assigned`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );

  return {
    assignedBenefits,
    assignedBenefitsLoading: isLoading,
    assignedBenefitsFetch: refetch,
  };
};

export default useAssignedBenefit;