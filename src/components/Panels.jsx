import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../data/api";

const Panels = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(API_URL);
        setData(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full">
      <div className="text-lg px-4 py-5 rounded-xl bg-[#bdbdbd] font-OpenSans grid grid-cols-4 gap-6 text-center">

        <div>
          <p className="font-bold font-Montserrat">Power (kW)</p>
          <p className="dash-param">{data.Power_kW?.toFixed(2)}</p>
        </div>

        <div>
          <p className="font-bold font-Montserrat">Energy (kWh)</p>
          <p className="dash-param">{data.Energy_kWh?.toFixed(2)}</p>
        </div>

        <div>
          <p className="font-bold font-Montserrat">Power Factor</p>
          <p className="dash-param">{data.Power_Factor?.toFixed(3)}</p>
        </div>

        <div>
          <p className="font-bold font-Montserrat">KVA</p>
          <p className="dash-param">{data.KVA?.toFixed(2)}</p>
        </div>

      </div>
    </div>
  );
};

export default Panels;
