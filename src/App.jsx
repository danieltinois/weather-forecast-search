import { useState, useEffect } from "react";
import { getWeatherData, getWeatherIconUrl } from "./services/api";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState("");

  const city = searchCity;

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (searchCity !== "") {
        const data = await getWeatherData(city);
        setWeatherData(data);
      } else {
        console.log("vazio");
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-6xl font-bold text-gray-600 mb-5">Weather in</h1>
      <input
        className="rounded-[40px] font-sans text-lg mb-5 p-3 px-5 w-[450px] shadow-md focus:border-transparent focus:outline-none"
        type="text"
        placeholder="Enter the name of a city... ex: São Paulo"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      <div>
        {weatherData ? (
          <div className="w-[450px] flex flex-col justify-center items-center bg-white rounded-[40px] shadow-xl p-5 text-gray-500">
            <p className="text-3xl font-semibold mb-5">{weatherData.name}</p>

            <ul className="flex justify-around w-full">
              <li>
                <p className="text-6xl">{weatherData.main.temp.toFixed(0)}°C</p>
              </li>
              <li>
                <ul>
                  <li className="w-20 mb-2">
                    {weatherData.weather[0].description.toUpperCase()}
                  </li>
                  <li className="mb-1">
                    Max {weatherData.main.temp_max.toFixed(0)}°C
                  </li>
                  <li className="mb-1">
                    Min {weatherData.main.temp_min.toFixed(0)}°C
                  </li>
                </ul>
              </li>
            </ul>
            <div className="bg-gray-900 rounded-full my-5">
              <img
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                className="w-28"
              />
            </div>

            <ul className="flex mt-6 mb-5 text-lg">
              <li className="pr-8">
                <ul>
                  <li className="text-3xl">
                    {weatherData.main.feels_like.toFixed(0)}°C
                  </li>
                  <li>Feels like</li>
                </ul>
              </li>
              <li className="pl-8">
                <ul>
                  <li className="text-3xl">{weatherData.main.humidity}%</li>
                  <li>Humidity</li>
                </ul>
              </li>
            </ul>
          </div>
        ) : (
          <div className="w-96 flex flex-col justify-center items-center bg-white rounded-[40px] shadow-xl p-5 text-gray-500">
            <h1 className="text-3xl">City not found...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
