// pages/api/proxy.js
export default async function handler(req, res) {
    const response = await fetch('http://3.25.91.3:4000/api/sensordata');
    const data = await response.json();
    res.status(200).json(data);
  }