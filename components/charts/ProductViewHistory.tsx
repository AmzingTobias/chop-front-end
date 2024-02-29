"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  registerables,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import SectionHeading from "@/app/components/SectionHeading";
import { DateRange } from "react-day-picker";
import DatePicker from "./DatePicker";

type TProductViewHistory = {
  productId: number;
  name: string;
  viewCount: number;
};
const fetchData = (
  startDate?: Date,
  endDate?: Date
): Promise<TProductViewHistory[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS
      }/v1/analytics/product-view-history${startDate || endDate ? "?" : ""}${
        startDate ? "startDate=" + startDate.toISOString().split("T")[0] : ""
      }${startDate && endDate ? "&" : ""}${
        endDate ? "endDate=" + endDate.toISOString().split("T")[0] : ""
      }`,
      {
        mode: "cors",
        credentials: "include",
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        } else {
          reject("Failed to get purchase analytics");
        }
      })
      .catch((err) => reject(err));
  });
};

const ProductViewHistory = () => {
  const useData = () => {
    const [data, setData] = useState<TProductViewHistory[]>([]);
    const refreshData = useCallback(
      (startDate?: Date, endDate?: Date) => {
        fetchData(startDate, endDate)
          .then((dataFetched) => {
            if (dataFetched.length > 5) {
              const topValues = dataFetched.slice(0, 5);
              const otherCount = dataFetched
                .slice(5)
                .reduce((sum, entry) => sum + entry.viewCount, 0);
              const condensedData: TProductViewHistory[] = [
                ...topValues,
                { name: "Other", productId: -1, viewCount: otherCount },
              ];
              setData(condensedData);
            } else {
              setData(dataFetched);
            }
          })
          .catch((err) => {
            console.error(err);
            setData([]);
          });
      },
      [setData]
    );
    useEffect(() => {
      refreshData();
    }, [refreshData]);
    return { data, refreshData };
  };
  const { data: productViewHistoryData, refreshData } = useData();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  useState(productViewHistoryData);

  useEffect(() => {
    refreshData(dateRange?.from, dateRange?.to);
  }, [dateRange, refreshData]);

  const chartData: ChartData<"doughnut"> = {
    labels: productViewHistoryData.map((entry) => entry.name),
    datasets: [
      {
        data: productViewHistoryData.map((entry) => entry.viewCount),
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

  const chartOptions: ChartOptions<"doughnut"> = {
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

  ChartJS.register(...registerables);

  return (
    <div className=" h-fit w-full bg-accent text-accent-foreground p-4 rounded-md flex flex-col gap-2">
      <SectionHeading text="View history" />
      <Doughnut data={chartData} options={chartOptions} />
      <div className="flex flex-row gap-4 w-full justify-center">
        <DatePicker
          dateRange={dateRange}
          fromDate={undefined}
          setDateRange={setDateRange}
        />
      </div>
    </div>
  );
};

export default ProductViewHistory;
