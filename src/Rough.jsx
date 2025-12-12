import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://energy-x-backend-1.onrender.com/api/meter26/latest"
        );
        setData(res.data);
        console.log("Meter 26:", res.data);
      } catch (error) {
        console.error("Error fetching meter 26:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full p-8 bg-[#F1F4FC] dark:bg-[#1e1e1e] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Meter 26 – Live Dashboard</h1>

      {!data ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="font-semibold text-lg">Power (kW)</h2>
            <p className="text-3xl font-bold">
              {data.Total_KW_meter_26?.toFixed(2)}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="font-semibold text-lg">Energy (kWh)</h2>
            <p className="text-3xl font-bold">
              {data.TotalNet_KWH_meter_26?.toFixed(2)}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="font-semibold text-lg">Power Factor</h2>
            <p className="text-3xl font-bold">
              {data.Avg_PF_meter_26?.toFixed(3)}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="font-semibold text-lg">kVA</h2>
            <p className="text-3xl font-bold">
              {data.Total_KVA_meter_26?.toFixed(2)}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow md:col-span-2">
            <h2 className="font-semibold text-lg">Last Updated</h2>
            <p className="text-xl">
              {data.timestamp ? new Date(data.timestamp).toLocaleString() : "N/A"}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;
