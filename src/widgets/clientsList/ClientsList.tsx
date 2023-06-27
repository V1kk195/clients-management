import { ReactNode } from 'react';

import { Accordion } from '../../shared/components';
import { Client } from '../../shared/types';
import { RemoveItem } from '../../features';
import { useDeleteClientMutation } from '../../shared/api';

type Props = {
    clients: Client[];
    renderBody: (item: Client) => ReactNode;
};

export const ClientsList = ({ clients, renderBody }: Props) => {
    const [removeClient, { isLoading }] = useDeleteClientMutation();

    const handleRemove = (id: string) => {
        removeClient(id);
    };

    if (!clients?.length) {
        return <div>No clients</div>;
    }

    return (
        <Accordion
            list={clients}
            renderBody={renderBody}
            getHeading={(item) => item.name}
            id={'clients'}
            renderHeaderButtons={(item) => (
                <RemoveItem
                    onRemove={() => handleRemove(item.id)}
                    isLoading={isLoading}
                />
            )}
        />
    );
};
