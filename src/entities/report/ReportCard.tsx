import { VerticalBar, PieChart } from '../../shared/components';
import { ReportData } from '../../shared/types';
import { useDeleteDataMutation } from '../../shared/api';
import { RemoveItem } from '../../features';
import styles from './ReportCard.module.scss';

type Props = {
    data: ReportData[];
    reportId: string;
};

export const ReportCard = ({ data, reportId }: Props) => {
    const [removeReport, { isLoading }] = useDeleteDataMutation();

    const handleRemove = (dataId: string): void => {
        removeReport({ reportId, dataId });
    };

    return (
        <div>
            {data.map((item) => {
                return (
                    <div
                        key={item.id}
                        className="container d-flex mb-5 position-relative justify-content-center"
                    >
                        {item.type === 'expenses' ? (
                            <VerticalBar data={item} />
                        ) : null}

                        {item.type === 'ads' ? (
                            <div className="w-75">
                                <PieChart data={item} />
                            </div>
                        ) : null}

                        <div className={styles.removeButton}>
                            <RemoveItem
                                onRemove={() => handleRemove(item.id)}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
