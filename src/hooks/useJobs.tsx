import { useQuery } from "react-query";

const useJobs = (token: any) => {

    const { data: jobs, isLoading, refetch } = useQuery(['jobs', token], () =>
        fetch(`${process.env.serverUrl}job`)
            .then(res => res.json()))

    return { jobs, jobsLoading: isLoading, jobsFetch: refetch };
}

export default useJobs;