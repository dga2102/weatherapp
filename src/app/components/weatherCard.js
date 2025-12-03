"use client"

import { useEffect, useState } from "react";
import { getForecast, weatherMap } from "../api.js"

export default function WeatherCard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                const forecast = await getForecast();
                console.log("Forecast:", forecast);
                setData(forecast);
            }   catch (err) {
                console.error("Weather fetch failed:", err);
            }
        }
        load();
    }, []);

    if (!data || !data.current_weather || !data.daily) { 
        return <p>Loading...</p>;
    }
    return (
        <div className="weather-card">
            <div className="flex flex-wrap gap-4">
                {data.daily.time.slice(0, 7).map((day, i) => {
                const date = new Date(day);
                const condition = weatherMap[data.daily.weathercode[i]];

                return (
                <div className="bg-white rounded-lg shadow p-4 flex-1 basis-1/3 hover:scale-102 transition-transform">
                    <h2 className="text-xl font-semibold">{date.toLocaleDateString("en-GB", { weekday: "long" })}</h2>
                    <div className="text-gray-600">
                        <p>{date.toLocaleDateString()}</p>
                        <p>{condition}</p>
                        <p>{data.daily.temperature_2m_min[i]}° / {data.daily.temperature_2m_max[i]}°C</p>
                        <p>{data.daily.wind_speed_10m_max[i]} km/h</p>
                    </div>
                </div>
                );
            })};    
            </div>
        </div>
    );
}