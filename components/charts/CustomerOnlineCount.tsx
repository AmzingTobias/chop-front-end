"use client";

import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const fetchData = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/analytics/customer-count`,
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
            .then((data) => resolve(data["count"]))
            .catch((err) => reject(err));
        } else {
          reject("Failed to get purchase analytics");
        }
      })
      .catch((err) => reject(err));
  });
};

const CustomerOnlineCount = () => {
  const useCustomerOnlineCount = () => {
    const [onlineCount, setOnlineCount] = useState(0);
    useEffect(() => {
      const updateData = () => {
        // Your logic here
        fetchData()
          .then((count) => setOnlineCount(count))
          .catch((err) => {
            console.error(err);
            setOnlineCount(0);
          });
      };

      // Initial call
      updateData();

      // Set interval to call the function every 5 minutes
      const intervalId = setInterval(updateData, 60 * 5000);

      return () => clearInterval(intervalId);
    }, []);
    return onlineCount;
  };
  const onlineCount = useCustomerOnlineCount();
  return (
    <div className="flex flex-row items-center gap-2 text-lg">
      <FaUser />
      <h4>
        {onlineCount === 0
          ? "No customers online"
          : `${onlineCount} Customer${onlineCount > 1 ? "s" : ""} online`}
      </h4>
    </div>
  );
};

export default CustomerOnlineCount;
