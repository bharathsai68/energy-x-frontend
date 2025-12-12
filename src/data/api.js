// src/data/api.js

const BASE_URL = "https://energy-x-backend-1.onrender.com/api";

// Dynamic for all meters
export const getLatest = (id) => `${BASE_URL}/meter${id}/latest`;
export const getPrevDay = (id) => `${BASE_URL}/meter${id}/previousDayEnergy`;
export const getMonthly = (id) => `${BASE_URL}/meter${id}/monthly-energy`;
export const getHighestKva = (id) => `${BASE_URL}/meter${id}/highest-kva`;

// Default (Home uses Meter 26)
export const API_URL = getLatest(26);
