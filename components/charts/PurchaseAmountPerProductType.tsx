"use client";

import { useCallback, useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import SectionHeading from "@/app/components/SectionHeading";
import { DateRange } from "react-day-picker";
import DatePicker from "./DatePicker";
import PurchasePieChart from "./PurchasePieChart";

type TPurchasePerProductType = {
  productType: string;
  total: number;
};
const fetchData = (
  startDate?: Date,
  endDate?: Date
): Promise<TPurchasePerProductType[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS
      }/v1/analytics/product-type${startDate || endDate ? "?" : ""}${
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

const PurchaseAmountPerProductType = () => {
  const useData = () => {
    const [data, setData] = useState<TPurchasePerProductType[]>([]);
    const refreshData = useCallback(
      (startDate?: Date, endDate?: Date) => {
        fetchData(startDate, endDate)
          .then((dataFetched) => {
            if (dataFetched.length > 5) {
              const topValues = dataFetched.slice(0, 5);
              const otherCount = dataFetched
                .slice(5)
                .reduce((sum, entry) => sum + entry.total, 0);
              const condensedData: TPurchasePerProductType[] = [
                ...topValues,
                { productType: "Other", total: otherCount },
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
  const { data: productTypePurchaseData, refreshData } = useData();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  useState(productTypePurchaseData);

  useEffect(() => {
    refreshData(dateRange?.from, dateRange?.to);
  }, [dateRange, refreshData]);

  ChartJS.register(...registerables);

  return (
    <div className=" h-fit w-full bg-accent text-accent-foreground p-4 rounded-md flex flex-col gap-2">
      <SectionHeading text="Purchases per type" />
      {productTypePurchaseData.length > 0 ? (
        <PurchasePieChart
          data={productTypePurchaseData.map((entry) => entry.total)}
          labels={productTypePurchaseData.map((entry) => entry.productType)}
        />
      ) : (
        <div className="w-full flex items-center justify-center py-12">
          <h2 className="text-4xl italic">{`${"No data"}`}</h2>
        </div>
      )}
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

export default PurchaseAmountPerProductType;
