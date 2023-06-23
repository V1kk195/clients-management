import { ClientsList } from '../../widgets/clientsList';
import { useGetClientsQuery } from '../../shared/api/clientsApi';
import { ReportsList } from '../../widgets/reportsList';
import { AddNewClient } from '../../features/addNewClient';

export const ClientsPage = () => {
    const { data, error, isLoading } = useGetClientsQuery();

    if (isLoading) {
        return <div className="container">Loading</div>;
    }

    if (data) {
        return (
            <div className="container">
                <AddNewClient />
                <ClientsList
                    clients={data}
                    renderBody={(client) => (
                        <ReportsList
                            reports={client.reports}
                            clientId={client.id}
                        />
                    )}
                />
            </div>
        );
    }

    return <div className="container">No clients</div>;
};
