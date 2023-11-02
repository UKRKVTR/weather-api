import React from "react";
import styles from "./style.module.scss";

function Weather({
  weatherData,
  celsius,
  city,
  units,
  setCelsius,
  setUnits,
  setCity,
  loading,
}) {
  const temperatureC = `${weatherData?.current?.temperature_2m}${weatherData?.current_units?.temperature_2m}`;
  const speedKmH = `${weatherData?.current?.windspeed_10m}${weatherData?.current_units?.windspeed_10m}`;

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
          <div>{city}</div>
          <div>Temperature: {temperatureC}</div>
          <div>Wind speed: {speedKmH}</div>
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
            <option value="Zaporizhzhia">Zaporizhzhia</option>
            <option value="Kiyv">Kiyv</option>
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
          </select>
        </div>
        <div className={styles.parametrs}>{display()}</div>
      </div>
    </article>
  );
}

export default Weather;
