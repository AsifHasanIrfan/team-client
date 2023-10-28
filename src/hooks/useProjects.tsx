import { useQuery } from 'react-query';

const useProjects = (token: string, query: any) => {
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery(['projects', query, token], () =>
    fetch(
      query.length === 1 ? `${process.env.serverUrl}marketplace?category=${query[0]}` :
        query.length === 2 ? `${process.env.serverUrl}marketplace?category=${query[0]}&category=${query[1]}` :
          query.length === 3 ? `${process.env.serverUrl}marketplace?category=${query[0]}&category=${query[1]}&category=${query[2]}` :
            query.length === 4 ? `${process.env.serverUrl}marketplace?category=${query[0]}&category=${query[1]}&category=${query[2]}&category=${query[3]}` :
              query.length === 5 ? `${process.env.serverUrl}marketplace?category=${query[0]}&category=${query[1]}&category=${query[2]}&category=${query[3]}&category=${query[4]}` :
                query.length === 6 ? `${process.env.serverUrl}marketplace?category=${query[0]}&category=${query[1]}&category=${query[2]}&category=${query[3]}&category=${query[4]}&category=${query[5]}` :
                  `${process.env.serverUrl}marketplace`
      , {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()))

  return { projects, projectsLoading: isLoading, projectsFetch: refetch };
};

export default useProjects;
