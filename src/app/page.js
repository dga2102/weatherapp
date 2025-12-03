import Image from "next/image";
import CurrentCard from "./components/currentCard";
import SearchBar from "./components/searchBar";
import WeatherBar from "./components/weatherCard";

export default function Home() {
  return (
    <div className="flex h-screen flex-wrap">
      <div className="w-full md:w-1/2">
        <CurrentCard />
      </div>
      <div className="w-full md:w-1/2">
        <SearchBar />
        <WeatherBar />
      </div>
    </div>
  );
}
