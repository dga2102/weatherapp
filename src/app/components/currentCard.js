"use client"

import { useEffect, useState } from "react";
import { getForecast, weatherMap } from "../api.js"

export default function CurrentCard() {
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

    const todayDate = new Date(data.daily.time[0]);
    const todayCondition = weatherMap[data.current_weather?.weathercode] || "Unknown";

    return (
        <div className="weather-card">
            <div className="relative h-screen w-full md:w-1/2">
                <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0" 
                     alt="landscape" 
                     className="h-full w-full object-cover object-left rounded-lg"
                />

                <div className="absolute inset-0 flex p-10">
                    <div className="text-white text-5xl font-semibold drop-shadow-lg">
                        <h1>Today</h1><br />
                        <p className="text-3xl">{todayDate.toDateString()}</p><br />

                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <span className="text-3xl">Location</span>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-10 text-white font-semibold text-5xl">
                            <p>{data.current_weather.temperature}°C</p><br />
                            <p className="text-3xl">{todayCondition}</p><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}