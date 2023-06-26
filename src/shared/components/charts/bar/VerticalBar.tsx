import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { ReportData } from '../../../types';

type Props = {
    data: ReportData & ChartData<'bar'>;
    options?: ChartOptions<'bar'>;
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const colors = ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'];

export const VerticalBar = ({ data, options }: Props) => {
    const chartData = {
        labels: data.labels,
        datasets: data.datasets.map((item, index) => ({
            backgroundColor: colors[index || 0],
            ...item,
        })),
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: data.title,
            },
        },
        ...options,
    };

    return <Bar options={chartOptions} data={chartData} />;
};
