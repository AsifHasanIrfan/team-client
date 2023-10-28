import { useQuery } from "react-query";

const useContacts = (token: any) => {

    const { data: contacts, isLoading, refetch } = useQuery(['contacts', token], () =>
        fetch(`${process.env.serverUrl}contact`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json()))

    return { contacts, contactsLoading: isLoading, contactsFetch: refetch };
}

export default useContacts;