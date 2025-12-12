import React, { useEffect, useState } from "react";
import CurrentTime from "../components/CurrentTime";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { dark, green_fusion, light } from "../constants";
import { useTheme } from "../components/ThemeContext";

const SingleMeter = () => {
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { id } = useParams();

  // NEW BASE URL
  const API = `https://energy-x-backend-1.onrender.com/api/meter${id}/latest`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API);
        setData(response.data); // NEW: backend returns one object, not array
      } catch (error) {
        console.error("Error fetching meter data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1500);
    return () => clearInterval(interval);
  }, [id]);

  const meters = [
    { id: 26, name: "Main Meter (Meter 26)" },
    { id: 1, name: "VDC Block 2&3 Lighting" },
    { id: 2, name: "VDC Block 2&3 AC's" },
    { id: 3, name: "Mini Auditorium AC's" },
    // ... keep existing names
  ];

  const meterName =
    meters.find((m) => m.id == id)?.name || `Meter ${id}`;

  if (!data)
    return (
      <div className="flex justify-center items-center w-full text-white">
        Loading...
      </div>
    );

  return (
    <div className="flex md:flex-row flex-col">
      <Sidebar />
      <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto 2xl:px-5">

        {/* Header */}
        <header className="justify-between flex items-center py-2">
          <h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 flex gap-3 font-Audiowide font-bold dark:text-[#e4e2e2]">
            Green Fusion IoT Solutions
            <img src={green_fusion} className="w-20" />
          </h1>

          <span className="flex items-center">
            <img
              className="w-[30px] h-[30px] cursor-pointer"
              src={theme === "light" ? dark : light}
              onClick={toggleTheme}
            />
            <p className="px-4 text-gray-500 dark:text-[#eae8e8]">
              <CurrentTime />
            </p>
          </span>
        </header>

        {/* Meter Data */}
        <div className="flex flex-col items-center my-10">
          <div className="bg-gray-400 border rounded-xl px-10 py-6 shadow-md">

            {/* Meter Name */}
            <h2 className="font-bold text-xl text-center font-Montserrat mb-7">
              {meterName}
            </h2>

            {/* Main Details */}
            <div className="flex min-[1020px]:flex-row flex-col gap-5">

              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-5">
                <Row label="Voltage R - Phase" value={`${data.Voltage_V1N} V`} />
                <Row label="Voltage Y - Phase" value={`${data.Voltage_V2N} V`} />
                <Row label="Voltage B - Phase" value={`${data.Voltage_V3N} V`} />

                <Row label="Line Voltage VRY" value={`${data.Voltage_V12} V`} />
                <Row label="Line Voltage VYB" value={`${data.Voltage_V23} V`} />
                <Row label="Line Voltage VBR" value={`${data.Voltage_V31} V`} />

                <Row
                  label="Units Consumed"
                  value={`${data.TotalNet_KWH.toFixed(0)} kWh`}
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-5">
                <Row label="Current R - Phase" value={`${data.Current_I1} A`} />
                <Row label="Current Y - Phase" value={`${data.Current_I2} A`} />
                <Row label="Current B - Phase" value={`${data.Current_I3} A`} />

                <Row label="Real Power (P)" value={`${data.Total_KW} kW`} />
                <Row label="Apparent Power (S)" value={`${data.Total_KVA} kVA`} />
                <Row label="Reactive Power (Q)" value={`${data.Total_KVAR} kVAR`} />
                <Row label="Power Factor" value={data.Avg_PF} />
              </div>
            </div>

            {/* Neutral Current */}
            <div className="flex justify-center mt-5">
              <Row label="Neutral Current" value={data.Neutral_Current} />
            </div>

          </div>
        </div>

      </section>
    </div>
  );
};

// REUSABLE ROW COMPONENT
const Row = ({ label, value }) => (
  <div className="flex justify-between items-center gap-4">
    <h2 className="parameter">{label}</h2>
    <p className="param-value">{value}</p>
  </div>
);

export default SingleMeter;
