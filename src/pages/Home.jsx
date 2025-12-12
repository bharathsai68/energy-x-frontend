import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentTime from "../components/CurrentTime";
import Loading from "../components/Loading";
import { useTheme } from "../components/ThemeContext";
import { dark, light } from "../constants";
import EnergyUnits from "../components/EnergyUnits";
import RealTimeKvaMeter from "../components/charts/RealTimeKvaMeter";
import EnergyConsumptionChart from "../components/charts/EnergyConsumptionChart";
import PowerLineChart from "../components/charts/PowerLineChart";
import KvaLineChart from "../components/charts/KvaLineChart";
import { API_URL } from "../data/api";

const Home = () => {
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching meter 26:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto 2xl:px-5">
      <header className="justify-between flex items-center py-2">
        <h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 flex md:gap-3 font-Audiowide font-bold dark:text-[#e4e2e2]">
          ENERGY X
        </h1>
        <span className="flex flex-row justify-center items-center">
          <img
            className="w-[30px] h-[30px] cursor-pointer 2xl:w-[42px] 2xl:h-[42px]"
            src={theme === "light" ? dark : light}
            alt="theme"
            onClick={toggleTheme}
          />
          <p className="md:text-sm 2xl:text-2xl text-xs px-4 text-gray-500 font-Audiowide dark:text-[#eae8e8]">
            <CurrentTime />
          </p>
        </span>
      </header>

      {/* MAIN PCC CARD */}
      <div className="grid lg:grid-cols-2 gap-4 grid-cols-1 mt-2 2xl:mt-6">
        <div className="w-full flex flex-col justify-around bg-[#a4a4e3] rounded-lg xl:text-xl text-lg shadow font-OpenSans py-4 px-3 2xl:px-7">

          <div className="param-div font-bold font-Montserrat text-lg">
            <h2 className="value bg-transparent">Main Meter (Meter 26)</h2>

            <p className="value bg-transparent pr-2 leading-5">
              Power <p className="text-sm">(kW)</p>
            </p>
            <p className="value bg-transparent pr-2 leading-5">
              Energy <p className="text-sm">(kWh)</p>
            </p>
            <p className="value bg-transparent pr-2">kVA</p>
            <p className="value bg-transparent pr-1 leading-5">
              Power <p>Factor</p>
            </p>
          </div>

          <div className="param-div">
            <h2 className="pccs">PCC 1</h2>

            <p className="value">{data.Power_kW?.toFixed(2)}</p>
            <p className="value">{data.Energy_kWh?.toFixed(2)}</p>
            <p className="value">{data.KVA?.toFixed(2)}</p>
            <p className="value">{data.Power_Factor?.toFixed(3)}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
          <EnergyUnits
            energy={(data.Energy_kWh || 0).toFixed(2)}
            monthlyEnergy={(data.Energy_kWh || 0).toFixed(2)}
          />

          <div className="flex flex-col gap-4">
            <RealTimeKvaMeter
              kva={data.KVA?.toFixed(2)}
              todayKva={data.KVA}
              monthKva={data.KVA}
            />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex md:flex-row gap-4 flex-col h-[44%] mt-4">
        <EnergyConsumptionChart />
        <PowerLineChart />
        <KvaLineChart />
      </div>
    </section>
  );
};

export default Home;
