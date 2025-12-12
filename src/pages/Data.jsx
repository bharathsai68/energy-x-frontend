import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const Data = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); 
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch when date changes
  useEffect(() => {
    fetchSensorData(date);
  }, [date]);

  // Function to fetch DATA for specific date
  const fetchSensorData = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://energy-x-backend-1.onrender.com/api/meter26/bydate/${selectedDate}`
      );

      const data = await response.json();
      setSensorData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from Energy-X API');
    }
    setLoading(false);
  };

  return (
    <section className="w-full h-fit flex md:flex-row flex-col">
      <Sidebar />
      <div className="p-6 bg-gray-100 min-h-screen w-full">

        <div className='flex justify-between mb-4'>
          <h1 className="text-2xl font-bold mb-4">Meter 26 Data Dashboard</h1>

          <div className="flex gap-4 items-center">
            <label className="text-gray-700 text-lg font-bold">
              Select Date:
            </label>
            <input
              type="date"
              className="p-2 border rounded-lg shadow-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {loading && <div className="text-blue-500 text-lg">Loading...</div>}
        {error && <div className="text-red-500 text-lg">{error}</div>}

        {sensorData.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Meter 26 Data for {date}
            </h2>

            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Timestamp</th>
                  <th className="py-2 px-4 border">Total KW</th>
                  <th className="py-2 px-4 border">TotalNet KWH</th>
                  <th className="py-2 px-4 border">Total KVA</th>
                  <th className="py-2 px-4 border">Avg PF</th>
                  <th className="py-2 px-4 border">TotalNet KVAH</th>
                  <th className="py-2 px-4 border">Energy Consumption</th>
                </tr>
              </thead>

              <tbody>
                {sensorData.map((d) => (
                  <tr key={d.id}>
                    <td className="py-2 px-4 border">{d.timestamp}</td>
                    <td className="py-2 px-4 border">{d.Total_KW_meter_26}</td>
                    <td className="py-2 px-4 border">{d.TotalNet_KWH_meter_26}</td>
                    <td className="py-2 px-4 border">{d.Total_KVA_meter_26}</td>
                    <td className="py-2 px-4 border">{d.Avg_PF_meter_26}</td>
                    <td className="py-2 px-4 border">{d.TotalNet_KVAH_meter_26}</td>
                    <td className="py-2 px-4 border">{d.energy_consumption_meter_26}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && sensorData.length === 0 && (
          <p className="text-gray-600">No data found for this date.</p>
        )}
      </div>
    </section>
  );
};

export default Data;
