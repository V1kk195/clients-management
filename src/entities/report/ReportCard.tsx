import { VerticalBar, PieChart } from '../../shared/components';
import { ReportData } from '../../shared/types';

type Props = {
    data: ReportData[];
};
export const ReportCard = ({ data }: Props) => {
    return (
        <div>
            {data.map((item) => {
                return (
                    <div key={item.id} className="flex-row flex-wrap gap-5">
                        {item.type === 'expenses' ? (
                            <VerticalBar data={item} />
                        ) : null}

                        {item.type === 'ads' ? <PieChart data={item} /> : null}
                    </div>
                );
            })}
        </div>
    );
};
