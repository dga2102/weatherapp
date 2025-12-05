"use client"

import Image from "next/image";
import { useState } from "react";
import CurrentCard from "./components/currentCard";
import SearchBar from "./components/searchBar";
import WeatherBar from "./components/weatherCard";

export default function Home() {
  const [coords, setCoords] = useState({ lat: 51.5072, lon: -0.1276, name: "London" });

  return (
    <div className="flex h-screen flex-wrap">
      <div className="w-full md:w-1/2">
        <CurrentCard coords={coords}/>
      </div>
      <div className="w-full md:w-1/2 bg-gray-50">
        <SearchBar />
        <WeatherBar />
      </div>
    </div>
  );
}
