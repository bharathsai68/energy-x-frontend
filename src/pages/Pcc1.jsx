import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentTime from '../components/CurrentTime';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import { dark, green_fusion, light } from '../constants';
import Sidebar from '../components/Sidebar'
import { API_URL } from '../data/api';

const Pcc1 = () => {

  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        setData(response.data[0]);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1500);
    return () => clearInterval(interval);
  }, []);

  const getPFClass = (avgPF) => {
    if (avgPF < 0.7) return 'bg-red-400';
    if (avgPF < 0.8) return 'bg-yellow-400';
    return '';
  };

  return (
    <div className='flex md:flex-row flex-col'>
      <Sidebar/>
      <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto 2xl:px-5">

        <header className="justify-between flex items-center py-2">
          <h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 flex md:gap-3 font-Audiowide font-bold dark:text-[#e4e2e2]">
            Green Fusion IoT Solutions
            <img src={green_fusion} className="w-20" alt="" /> 
          </h1>

          <span className="flex flex-row justify-center items-center">
            <img
              className="w-[30px] h-[30px] cursor-pointer 2xl:w-[42px] 2xl:h-[42px]"
              src={theme === "light" ? dark : light}
              alt="theme"
              onClick={toggleTheme}
            />
            <p className="md:text-sm 2xl:text-2xl text-xs text-center px-4 text-gray-500 font-Audiowide font-medium dark:text-[#eae8e8]">
              <CurrentTime />
            </p>
          </span>
        </header>

        <section className="flex justify-center items-center">
          <div className="my-8 bg-gray-400 xl:px-10 py-5 rounded-lg md:px-7 px-2 overflow-x-auto">
            
            <h2 className='font-bold text-xl text-center underline my-2 mb-6'>PCC1</h2>

            <div className="flex rounded-md justify-between text-center items-center font-Montserrat font-bold pr-9 my-2">
              <h2 className="rounded-full text-gray-400 w-64">PCC</h2>
              <p className="rounded-full">Power(kW)</p>
              <p className="rounded-full">Energy(kWh)</p>
              <p className="rounded-full pr-4">Power Factor</p>
              <p className="rounded-full pr-4">kVA</p>
            </div>

            {/* ---------------- ONLY METER 26 ---------------- */}
            <div className="param1-div">
              <Link to='/SingleMeter/26'>
                <h2 className='parameter'>Main Meter</h2>
              </Link>

              <p className='param-value'>
                {data?.Total_KW_meter_26?.toFixed(2) ?? "-"}
              </p>

              <p className='param-value'>
                {data?.TotalNet_KWH_meter_26?.toFixed(2) ?? "-"}
              </p>

              <p className={`param-value ${getPFClass(data?.Avg_PF_meter_26)}`}>
                {data?.Avg_PF_meter_26?.toFixed(2) ?? "-"}
              </p>

              <p className='param-value'>
                {data?.Total_KVA_meter_26?.toFixed(2) ?? "-"}
              </p>
            </div>

            {/* ------------------------------------------------ */}

          </div>
        </section>

      </section>
    </div>
  );
};

export default Pcc1;
