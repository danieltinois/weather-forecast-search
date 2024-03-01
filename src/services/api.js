import axios from "axios";

const apiKey = "26a54bb1495cb196422e950590368b2e";

const getWeatherData = async (city) => {
  try {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Erro ao recuperar os dados: ", error);
    return null;
  }
};

const getWeatherIconUrl = (iconCode) => {
  return `http://openweathermap.org/img/wn/${iconCode}.png`;
};

export { getWeatherData, getWeatherIconUrl };
