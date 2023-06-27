import { ReactNode } from 'react';

import { Accordion } from '../../shared/components';
import { Client } from '../../shared/types';

type Props = {
    clients: Client[];
    renderBody: (item: Client) => ReactNode;
};

export const ClientsList = ({ clients, renderBody }: Props) => {
    if (!clients?.length) {
        return <div>No clients</div>;
    }

    return (
        <Accordion
            list={clients}
            renderBody={renderBody}
            getHeading={(item) => item.name}
            id={'clients'}
        />
    );
};
