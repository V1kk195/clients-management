import { ReactElement } from 'react';

import { Accordion } from '../../shared/components';
import { ReportCard } from '../../entities/report';
import { Report } from '../../shared/types';
import { AddNewData, AddNewReport } from '../../features';

type Props = {
    reports: Report[];
    clientId: string;
};

export const ReportsList = ({ reports, clientId }: Props) => {
    const renderBody = (item: Report): ReactElement => (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <p>Report "{item.title}" data</p>
                <AddNewData reportId={item.id} />
            </div>

            <ReportCard data={item.data} />
        </div>
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <p>Client's reports</p>
                <AddNewReport clientId={clientId} />
            </div>

            <Accordion
                list={reports}
                renderBody={renderBody}
                getHeading={(item) => item.title}
                id={`reports${clientId}`}
            />
        </div>
    );
};
