export const ReportCard = ({ data }) => {
    return (
        <div>
            {data.map((item) => {
                return (
                    <div key={item.id} className="flex-row flex-wrap gap-5">
                        {/*{item}*/}
                    </div>
                );
            })}
        </div>
    );
};
