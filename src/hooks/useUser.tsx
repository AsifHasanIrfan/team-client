import { useQuery } from "react-query";

const useUser = (token: string, id: string) => {

    const {
      data: user,
      isLoading,
      refetch,
    } = useQuery(
      ['singleUer', token, id],
      () =>
        fetch(`${process.env.serverUrl}user/${id}`, {
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
      { enabled: id?.length > 0 }
    );

    return { user, userLoading: isLoading, userFetch: refetch };
}

export default useUser;