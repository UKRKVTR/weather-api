import "./App.css";
import Weather from "./Components";
import { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [celsius, setCelsius] = useState("celsius");
  const [city, setCity] = useState("Zaporizhzhia");
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState("km");

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.open-meteo.com/v1/forecast?${
        city === "Zaporizhzhia"
          ? "latitude=47.8517&longitude=35.1171"
          : "latitude=50.2667&longitude=24.4333"
      }&current=temperature_2m,windspeed_10m&hourly=temperature_2m${
        celsius === "celsius" ? "" : "&temperature_unit=fahrenheit"
      }${units === "km" ? "" : "&windspeed_unit=ms"}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => console.log("Error:", err))
      .finally(() => {
        setLoading(false);
      });
  }, [celsius, units, city]);

  return (
    <Weather
      weatherData={weatherData}
      celsius={celsius}
      setCelsius={setCelsius}
      city={city}
      units={units}
      setUnits={setUnits}
      setCity={setCity}
      loading={loading}
    />
  );
}

export default App;
