import React from 'react';
import { Line } from 'react-chartjs-2';

interface MonthlyChartProps {
  labels: string[];
  dataInput: number[];
}

const LineChartQuartely: React.FC<MonthlyChartProps> = ({ labels, dataInput }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Faturamento Anual de Todas as Empresas',
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Faturamento Mensal',
        data: dataInput,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="w-100">
      <Line data={data} options={options} className="w-100" />
    </div>
  );
};

export default LineChartQuartely;
