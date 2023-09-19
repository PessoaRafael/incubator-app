import React from 'react';
import { Line } from 'react-chartjs-2';

interface Chart {
  labels: string[];
  dataInput: any[];
}

const LineChartYearly: React.FC<Chart> = ({ labels, dataInput }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Faturamento Trimestral de todas empresas',
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Faturamento',
        data: dataInput,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="w-100">
      <Line data={data} options={options} className="w-100" />
    </div>
  );
};

export default LineChartYearly;
