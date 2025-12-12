import GaugeChart from "react-gauge-chart";
import { useTheme } from "../ThemeContext";
import { useState, useEffect, useRef } from "react";
import alertSound from "../../constants/alert.mp3";

const RealTimeKvaMeter = ({ kva, todayKva, monthKva }) => {
  const { theme } = useTheme();
  const [value, setValue] = useState(0);
  const minEnergy = 0;
  const maxEnergy = 1500;

  const normalizedPower = (kva - minEnergy) / (maxEnergy - minEnergy);
  const gaugeColors = ["#00ff00", "#ff0000"];

  const [showAlert, setShowAlert] = useState(false);
  const audioRef = useRef(new Audio(alertSound));

  // Function to check KVA limit and show alert

  const checkLimit = () => {
    if (kva > 1100) {
      setShowAlert(true);
      audioRef.current.loop = true; // Set audio to loop
      audioRef.current.play(); // Play alert sound
    } else {
      setShowAlert(false);
      audioRef.current.pause(); // Stop alert sound if not exceeding limit
      audioRef.current.currentTime = 0; // Reset audio to start
    }
  };

  // Update the value and check limit when KVA changes
  useEffect(() => {
    if (kva > value) {
      setValue(kva);
    }
    checkLimit();
  }, [kva, value]);

  // Function to dismiss the alert
  const dismissAlert = () => {
    setShowAlert(false);
    audioRef.current.pause(); // Stop alert sound
    audioRef.current.currentTime = 0; // Reset audio to start
  };

  return (
    <div
      className={`relative bg-white py-1 dark:text-white h-full rounded-lg w-full flex flex-col items-center shadow font-OpenSans dark:bg-[#2c2c2c]`}
    >
      {/* Top Alert Box */}
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 font-bold p-4 bg-red-500 text-white text-center z-50 flex justify-between items-center">
          <span>Energy Limit Exceeded</span>
          <button
            onClick={dismissAlert}
            className="text-white hover:text-gray-200"
          >
            {/* Cancel Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <h2 className="font-bold text-xl font-Montserrat">CMD</h2>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        colors={gaugeColors}
        percent={normalizedPower}
        textColor={theme === "light" ? "#000000" : "#ffffff"}
        formatTextValue={() => `${kva} kVA`}
        className="min-[2000px]:text-3xl xl:text-xl text-lg max-[500px]:text-base font-medium"
      />
      <h2 className="font-OpenSans text-sm font-medium flex flex-col">
        Today Highest Peak Value
        <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
          {todayKva > value ? todayKva : value} kVA
        </span>
      </h2>
      <h2 className="font-OpenSans text-sm font-medium flex flex-col">
        Month Highest Peak Value
        <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
          {monthKva} kVA
        </span>
      </h2>
    </div>
  );
};

export default RealTimeKvaMeter;
