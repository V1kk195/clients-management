export type Client = {
    id: number;
    name: string;
    reports: Report[];
};

export type Report = {
    id: number;
    title: string;
    data: any[];
};

export type ExpensesData = {
    id: string;
    type: 'expenses';
    labels: string[];
    datasets: { label: string; data: number[] }[];
};
