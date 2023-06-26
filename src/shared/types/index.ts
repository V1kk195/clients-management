export type ReportData = {
    id: string;
    type: 'expenses' | 'ads';
    title: string;
    labels: string[];
    datasets: { label: string; data: number[] }[];
};

export type Report = {
    id: number;
    title: string;
    data: ReportData[];
};

export type Client = {
    id: number;
    name: string;
    reports: Report[];
};
