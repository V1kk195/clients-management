import { Accordion } from '../../shared/components/accordion';
import { ReportCard } from '../../entities/report';
import { Report } from '../../shared/types';

type Props = {
    reports: Report[];
    clientId: number;
};

export const ReportsList = ({ reports, clientId }: Props) => {
    return (
        <Accordion
            list={reports}
            renderBody={(item) => <ReportCard data={item.data} />}
            getHeading={(item) => item.title}
            id={`reports${clientId}`}
        />
    );
};
