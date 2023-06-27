import { Button } from '../../shared/components';
import { useAddDataToReportMutation } from '../../shared/api';

type Props = {
    reportId: string;
};

export const AddNewData = ({ reportId }: Props) => {
    const [addData, { isLoading }] = useAddDataToReportMutation();

    const handleAddData = (): void => {
        addData(reportId);
    };

    return (
        <Button
            caption={'Add data'}
            onClick={handleAddData}
            disabled={isLoading}
        />
    );
};
