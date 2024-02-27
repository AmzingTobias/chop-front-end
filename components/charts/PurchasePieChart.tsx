import { ChartData, ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

interface IPurchasePieChartProps {
  labels: string[];
  data: number[];
}

const PurchasePieChart: React.FC<IPurchasePieChartProps> = ({
  labels,
  data,
}) => {
  const chartData: ChartData<"pie"> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  const chartOptions: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#FFFFFF",
        },
        onClick: () => {},
      },
    },
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default PurchasePieChart;
