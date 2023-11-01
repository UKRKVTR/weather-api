import { useState, useEffect } from "react";
import React from "react";
import styles from "./style.module.scss";

function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [celsius, setCelsius] = useState("celsius");
  const [units, setUnits] = useState("km");

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=47.8517&longitude=35.1171&current=temperature_2m,windspeed_10m&hourly=temperature_2m${
        celsius === "celsius" ? "" : "&temperature_unit=fahrenheit"
      }${units === "km" ? "" : "&windspeed_unit=ms"}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, [celsius, units]);

  const temperatureC = weatherData?.current?.temperature_2m;
  const unitsC = weatherData?.current_units?.temperature_2m;
  const speedKmH = weatherData?.current?.windspeed_10m;
  const unitsKmH = weatherData?.current_units?.windspeed_10m;

  function handleCelsiusChange(value) {
    setCelsius(value);
  }
  function handleSpeedChange(value) {
    setUnits(value);
  }
  return (
    <article>
      <div className={styles.main}>
        <div className={styles.select}>
          <select
            defaultValue={celsius}
            onChange={(e) => handleCelsiusChange(e.target.value)}
          >
            <option value="celsius">°C</option>
            <option value="fahrenheit">°F</option>
          </select>
          <select
            defaultValue={celsius}
            onChange={(e) => handleSpeedChange(e.target.value)}
          >
            <option value="km">km/h</option>
            <option value="m">m/s</option>
          </select>
        </div>
        <div>
          <div>
            {temperatureC}
            {unitsC}
          </div>
          <div>
            {speedKmH}
            {unitsKmH}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Weather;
