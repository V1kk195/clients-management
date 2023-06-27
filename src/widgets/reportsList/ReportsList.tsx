import { ReactElement } from 'react';

import { Accordion } from '../../shared/components';
import { ReportCard } from '../../entities/report';
import { Report } from '../../shared/types';
import { AddNewData, AddNewReport, RemoveItem } from '../../features';
import { useDeleteReportMutation } from '../../shared/api';

type Props = {
    reports: Report[];
    clientId: string;
};

export const ReportsList = ({ reports, clientId }: Props) => {
    const [removeReport, { isLoading }] = useDeleteReportMutation();

    const handleRemove = (reportId: string): void => {
        removeReport({ clientId, reportId });
    };

    const renderBody = (item: Report): ReactElement => (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <p>Report "{item.title}" data</p>
                <AddNewData reportId={item.id} />
            </div>

            <ReportCard data={item.data} reportId={item.id} />
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
                renderHeaderButtons={(item) => (
                    <RemoveItem
                        onRemove={() => handleRemove(item.id)}
                        isLoading={isLoading}
                    />
                )}
            />
        </div>
    );
};
