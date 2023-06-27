export type ReportData = {
    id: string;
    type: 'expenses' | 'ads';
    title: string;
    labels: string[];
    datasets: { label: string; data: number[] }[];
};

export type Report = {
    id: string;
    title: string;
    data: ReportData[];
};

export type Client = {
    id: string;
    name: string;
    reports: Report[];
};
