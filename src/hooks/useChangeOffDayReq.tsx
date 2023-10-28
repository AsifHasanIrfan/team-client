import { useQuery } from "react-query";

const useChangeOffDayReq = (token: any) => {

    const { data: changeOffDays, isLoading, refetch } = useQuery(['changeOffDays', token], () =>
        fetch(`${process.env.serverUrl}change-offday`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { changeOffDays, changeOffDaysLoading: isLoading, changeOffDaysFetch: refetch };
}

export default useChangeOffDayReq;