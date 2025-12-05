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
            <div className="flex flex-wrap justify-evenly max-h-[780px] overflow-y-auto">
                {data.daily.time.slice(0, 7).map((day, i) => {
                const date = new Date(day);
                const condition = weatherMap[data.daily.weathercode[i]];

                return (
                    <div key={`${day}-${i}`} className="flex items-center justify-center font-sans p-1">
                        <div className="bg-white rounded-xl shadow-lg w-60 h-65">
    
                            <div className="bg-[#3CA898] text-white p-5 flex justify-between items-start rounded-t-xl">
                                <div>
                                    <p className="text-2xl font-light">{date.toLocaleDateString("en-GB", { weekday: "long" })}</p>
                                    <p className="text-sm uppercase mt-1">{date.toLocaleDateString()}</p>
                                    <p className="text-6xl font-bold mt-2">{data.daily.temperature_2m_max[i]}°C</p>
                                    <p className="text-xs uppercase mt-2">London</p>
                                </div>
                            
                                <div className="flex items-center justify-center">
                                    <img src={iconMap[data.daily.weathercode[i]]} alt="icon" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 divide-x divide-gray-200">
                                <div className="text-center py-3 hover:bg-gray-200 transition">
                                    <span className="text-sm uppercase">{data.daily.wind_speed_10m_max[i]}km/h</span>
                                </div>

                                <div className="text-center py-3 hover:bg-gray-200 transition">
                                    <span className="text-sm uppercase">{data.daily.temperature_2m_min[i]}°C / {data.daily.temperature_2m_max[i]}°C</span>
                                </div>

                                <div className="text-center py-3 hover:bg-gray-200 transition">
                                    <span className="text-sm uppercase">{condition}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            })}   
            </div>
        </div>
    );
}