import { useState, useEffect } from "react";
import React from "react";
import styles from "./style.module.scss";

function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [celsius, setCelsius] = useState("celsius");
  const [city, setCity] = useState("zp");
  const [units, setUnits] = useState("km");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.open-meteo.com/v1/forecast?${
        city === "zp"
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
  function handleCityChange(value) {
    setCity(value);
  }
  function display() {
    if (loading) {
      return <div className={styles.loading}>Загрузка...</div>;
    } else {
      return (
        <>
          <div>
            {temperatureC}
            {unitsC}
          </div>
          <div>
            {speedKmH}
            {unitsKmH}
          </div>
        </>
      );
    }
  }
  return (
    <article>
      <div className={styles.main}>
        <div className={styles.select}>
          <select
            defaultValue={city}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            <option value="zp">Zaporizhzhia</option>
            <option value="kv">Kiyv</option>
          </select>
          <select
            defaultValue={celsius}
            onChange={(e) => handleCelsiusChange(e.target.value)}
          >
            <option value="celsius">°C</option>
            <option value="fahrenheit">°F</option>
          </select>
          <select
            defaultValue={units}
            onChange={(e) => handleSpeedChange(e.target.value)}
          >
            <option value="km">km/h</option>
            <option value="m">m/s</option>
          </select>{" "}
        </div>
        <div>{display()}</div>
      </div>
    </article>
  );
}

export default Weather;
