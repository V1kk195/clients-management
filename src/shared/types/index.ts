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
