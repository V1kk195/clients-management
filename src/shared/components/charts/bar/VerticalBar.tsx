import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { ExpensesData } from '../../../types';

type Props = {
    data: ExpensesData;
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const colors = ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'];

export const VerticalBar = ({ data }: Props) => {
    const chartData = {
        labels: data.labels,
        datasets: data.datasets.map(({ label, data }, index) => ({
            label,
            data,
            backgroundColor: colors[index || 0],
        })),
    };

    return <Bar options={options} data={chartData} />;
};
