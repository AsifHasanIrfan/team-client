import { useQuery } from "react-query";

const useGetPayments = (token: any, id: any) => {

    const { data: payments, isLoading, refetch } = useQuery(['allPayments', token], () =>
        fetch(`${process.env.serverUrl}user/payment/${id}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { payments, paymentsLoading: isLoading, paymentsFetch: refetch };
}

export default useGetPayments;