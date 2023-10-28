import { useQuery } from "react-query";

const useApplyProjects = (token: any, query: any) => {

    const { data: applyProjects, isLoading, refetch } = useQuery(['applyProjects', query, token], () =>
        fetch(`${process.env.serverUrl}apply/marketplace?${query}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { applyProjects, applyProjectsLoading: isLoading, applyProjectsFetch: refetch };
}

export default useApplyProjects;