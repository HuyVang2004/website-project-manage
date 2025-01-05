import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Đăng ký các thành phần cần thiết
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ data, labels, colors}) => {
  const chartData = {
    labels: labels,
    datasets: [
      { 
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map(color => color + '80'),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        font: {
          size: 3,
          weight: 'normal',
        },
      },
    },
    cutout: 0, 
    borderWidth: 0.5,  
  };
  

  return (
    <div style={{ width: '150px', height: '150px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
