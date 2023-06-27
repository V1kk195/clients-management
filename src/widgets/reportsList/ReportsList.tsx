import { Accordion } from '../../shared/components';
import { ReportCard } from '../../entities/report';
import { Report } from '../../shared/types';
import { AddNewReport } from '../../features';

type Props = {
    reports: Report[];
    clientId: string;
};

export const ReportsList = ({ reports, clientId }: Props) => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <p>Client's reports</p>
                <AddNewReport clientId={clientId} />
            </div>

            <Accordion
                list={reports}
                renderBody={(item) => <ReportCard data={item.data} />}
                getHeading={(item) => item.title}
                id={`reports${clientId}`}
            />
        </div>
    );
};
