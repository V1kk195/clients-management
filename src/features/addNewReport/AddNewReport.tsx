import { Button } from '../../shared/components';
import { useAddReportToClientMutation } from '../../shared/api';

type Props = {
    clientId: string;
};

export const AddNewReport = ({ clientId }: Props) => {
    const [addReport, { isLoading }] = useAddReportToClientMutation();

    const handleAddReport = () => {
        addReport(clientId);
    };

    return (
        <Button
            caption={'Add report'}
            onClick={handleAddReport}
            disabled={isLoading}
        />
    );
};
