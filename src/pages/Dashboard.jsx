import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLatest } from "../data/api";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(getLatest(26));
        setData(res.data);
      } catch (error) {
        console.error("Error fetching meter 26:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Meter 26 – Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Card title="Power (kW)" value={data.Total_KW_meter_26?.toFixed(2)} />

        <Card title="Energy (kWh)" value={data.TotalNet_KWH_meter_26?.toFixed(2)} />

        <Card title="Power Factor" value={data.Avg_PF_meter_26?.toFixed(3)} />

        <Card title="KVA" value={data.Total_KVA_meter_26?.toFixed(2)} />

        <div className="p-6 bg-white rounded-xl shadow col-span-2">
          <h2 className="font-semibold text-lg">Last Updated</h2>
          <p className="text-xl">{new Date(data.timestamp).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="p-6 bg-white rounded-xl shadow">
    <h2 className="font-semibold text-lg">{title}</h2>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
