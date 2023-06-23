import { ReactNode } from 'react';

import { Accordion } from '../../shared/components/accordion';
import { Client } from '../../shared/types';

type Props = {
    clients: Client[];
    renderBody: (item: Client) => ReactNode;
};

export const ClientsList = ({ clients, renderBody }: Props) => {
    return (
        <Accordion
            list={clients}
            renderBody={renderBody}
            getHeading={(item) => item.name}
            id={'clients'}
        />
    );
};
