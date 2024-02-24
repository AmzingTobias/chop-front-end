"use client";

import { useEffect, useState } from "react";
import {
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  registerables,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import SectionHeading from "@/app/components/SectionHeading";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { DateRange } from "react-day-picker";
import DatePicker from "./DatePicker";

type TPurchaseAmountPerDate = {
  totalProductsSold: number;
  totalAmount: number;
  placedOn: Date;
};
const fetchData = (): Promise<TPurchaseAmountPerDate[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/analytics/purchases`,
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

const PurchaseAmountPerDate = () => {
  const useData = () => {
    const [data, setData] = useState<TPurchaseAmountPerDate[]>([]);
    useEffect(() => {
      fetchData()
        .then((dataFetched) => {
          let minDate =
            dataFetched.length > 0
              ? new Date(dataFetched[0].placedOn)
              : new Date();
          setDateRange({ from: new Date(minDate), to: new Date() });
          setMinimumDate(new Date(minDate));
          const dateEntries = new Map<string, TPurchaseAmountPerDate>();
          dataFetched.forEach((entry) => {
            dateEntries.set(
              new Date(entry.placedOn as any).toDateString(),
              entry
            );
          });
          const today = new Date();
          while (minDate <= today) {
            if (!dateEntries.has(minDate.toDateString())) {
              dateEntries.set(minDate.toDateString(), {
                placedOn: new Date(minDate),
                totalAmount: 0,
                totalProductsSold: 0,
              });
            }
            minDate.setDate(minDate.getDate() + 1);
          }
          const asArray = Array.from(dateEntries, ([_, details]) => ({
            ...details,
          }));
          asArray.sort(
            (a, b) =>
              (new Date(a.placedOn) as any) - (new Date(b.placedOn) as any)
          );
          setData(asArray);
        })

        .catch((err) => {
          console.error(err);
          setData([]);
        });
    }, []);
    return data;
  };
  enum EDataToShow {
    PURCHASE_AMOUNT,
    PURCHASE_TOTAL,
  }
  const filterOptions: {
    display: string;
    value: string;
    chartValue: EDataToShow;
  }[] = [
    {
      display: "Number of products sold",
      value: "0",
      chartValue: EDataToShow.PURCHASE_AMOUNT,
    },
    {
      display: "Purchase total",
      value: "1",
      chartValue: EDataToShow.PURCHASE_TOTAL,
    },
  ];
  const purchaseData = useData();
  const [chartValue, setChartValue] = useState<EDataToShow>(
    EDataToShow.PURCHASE_AMOUNT
  );
  const [minimumDate, setMinimumDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [filteredPurchaseData, setFilteredPurchaseData] =
    useState(purchaseData);

  useEffect(() => {
    setFilteredPurchaseData(
      purchaseData.filter((data) =>
        dateRange !== undefined &&
        dateRange.from !== undefined &&
        dateRange?.to !== undefined
          ? new Date(data.placedOn).getDate() >= dateRange.from.getDate() &&
            new Date(data.placedOn).getDate() <= dateRange.to.getDate()
          : true
      )
    );
  }, [purchaseData, dateRange]);

  const barChartData: ChartData<"bar"> = {
    labels: filteredPurchaseData.map((entry) =>
      new Date(entry.placedOn).toLocaleDateString()
    ),
    datasets: [
      chartValue === EDataToShow.PURCHASE_AMOUNT
        ? {
            label: "Number of products sold",
            data: filteredPurchaseData.map((entry) => entry.totalProductsSold),
            backgroundColor: "#178582",
          }
        : {
            label: "Total purchase amount",
            data: filteredPurchaseData.map((entry) => entry.totalAmount),
            backgroundColor: "#178582",
          },
    ],
  };

  const barChartOptions: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        display: true,
        align: "end",
        labels: {
          color: "#FFFFFF",
        },
        onClick: () => {},
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            chartValue === EDataToShow.PURCHASE_TOTAL
              ? "£" + Number(tooltipItem.raw).toFixed(2)
              : tooltipItem.formattedValue,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#FFFFFF",
          callback: (value) =>
            (chartValue === EDataToShow.PURCHASE_TOTAL ? "£" : "") + value,
        },
        grid: {
          color: "#FFFFFF60",
        },
      },
      x: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#FFFFFF60",
        },
      },
    },
  };

  ChartJS.register(...registerables);

  return (
    <div className="max-h-full w-full bg-accent text-accent-foreground p-4 rounded-md">
      <SectionHeading text="Purchases" />
      <Bar data={barChartData} options={barChartOptions} />
      <div className="flex w-full gap-2 flex-col">
        <RadioGroup
          defaultValue="0"
          className="flex flex-row text-secondary w-full justify-center"
          onValueChange={(value) => {
            const chartValue = filterOptions.find(
              (option) => option.value === value
            );
            if (chartValue !== undefined) {
              setChartValue(chartValue.chartValue);
            }
          }}
        >
          {filterOptions.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                className="text-secondary border-secondary"
                value={option.value}
                id={`${option.value}-radio-group`}
              />
              <Label htmlFor={`${option.value}-radio-group`}>
                {option.display}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex flex-row gap-2 w-full justify-center">
          <DatePicker
            dateRange={dateRange}
            fromDate={minimumDate}
            setDateRange={setDateRange}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseAmountPerDate;
