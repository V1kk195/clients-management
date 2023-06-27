import { ReactNode, useState } from 'react';
import cx from 'classnames';

import { ClientsList, ReportsList } from '../../widgets';
import { AddNewClient, SearchClients } from '../../features';
import { useGetClientsQuery } from '../../shared/api';
import styles from './ClientsPage.module.scss';

export const ClientsPage = () => {
    const [searchValue, setSearchValue] = useState('');

    const { data, error, isLoading } = useGetClientsQuery(searchValue);

    const handleSearch = (value: string): void => {
        setSearchValue(value);
    };

    let content: ReactNode;

    if (isLoading) {
        content = 'Loading';
    }

    if (error) {
        content = 'Something went wrong';
    }

    if (data) {
        content = (
            <>
                <div
                    className={cx(
                        'd-flex justify-content-between mb-3',
                        styles.clientsPanel
                    )}
                >
                    <AddNewClient />
                    <SearchClients onSearch={handleSearch} />
                </div>

                <ClientsList
                    clients={data}
                    renderBody={(client) => (
                        <ReportsList
                            reports={client.reports}
                            clientId={client.id}
                        />
                    )}
                />
            </>
        );
    }

    return <div className="container py-5">{content}</div>;
};
