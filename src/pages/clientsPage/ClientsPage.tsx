import { useGetClientsQuery } from '../../shared/api/clientsApi';

export const ClientsPage = () => {
    const { data, error, isLoading } = useGetClientsQuery();

    console.log(data);

    return <div>Clients</div>;
};
