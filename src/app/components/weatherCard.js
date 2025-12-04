"use client"

import { useEffect, useState } from "react";
import { getForecast, weatherMap } from "../api.js"

export default function WeatherCard() {
    const [data, setData] = useState(null);

    const iconMap = {
        0: "/icons/sunny.svg",
        1: "/icons/sunny.svg",
        2: "/icons/cloudy.svg",
        3: "/icons/cloudy.svg",
        45: "/icons/cloudy.svg",
        48: "/icons/cloudy.svg",
        51: "/icons/rainy.svg",
        61: "/icons/rainy.svg",
        63: "/icons/rainy.svg",
        71: "/icons/snowy.svg",
        80: "/icons/rainy.svg",
        95: "/icons/thunder.svg",

    }

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
        <div>
            <div className="flex flex-wrap gap-2 justify-evenly">
                {data.daily.time.slice(0, 7).map((day, i) => {
                const date = new Date(day);
                const condition = weatherMap[data.daily.weathercode[i]];

                return (
                <div key={`${day}-${i}`} className="flex items-center justify-between w-[45%] rounded-xl shadow p-6 mb-6 bg-gradient-to-tl from-[#6BBDB3] to-[#7FC8B8]">
                    <div className="flex items-center gap-4">
                        <img src={iconMap[data.daily.weathercode[i]]} alt="icon" className=" w-8 h-8" />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">{data.daily.temperature_2m_max[i]}°C</h2>
                            <p className="text-sm text-gray-500">{date.toLocaleDateString("en-GB", { weekday: "long" })}</p>
                        </div>
                    
                        <div className="text-gray-600">
                            <p>{date.toLocaleDateString()}</p>
                            <p>{condition}</p>
                            <p>{data.daily.temperature_2m_min[i]}° / {data.daily.temperature_2m_max[i]}°C</p>
                            <p>{data.daily.wind_speed_10m_max[i]} km/h</p>
                        </div>
                    </div>
                </div>
                );
            })}   
            </div>
        </div>
    );
}