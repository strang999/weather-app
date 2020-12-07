import React from "react";
import { Image } from "semantic-ui-react";
import "./WeatherInfo.scss";
const WeatherInfo = ({ weatherData }) => {
  const {
    location,
    temperatureC,
    temperatureF,
    feelsLike,
    icon,
    humidity,
    pressure,
    description,
    tempMax,
    tempMin,
    flag,
  } = weatherData;
  return (
    <div>
      <p>
        <Image
          avatar
          alt={flag}
          src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${flag}.svg`}
        />
        <span style={{ fontSize: "26px", verticalAlign: "middle" }}>
          {location}
        </span>
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather_icon"
      />
      <p style={{ fontSize: "18px" }}>Conditions: {description} </p>

      <p>
        Temperature:
        {`${Math.round(temperatureC)} °C (${Math.round(
          temperatureF * 1.8 + 32
        )} °F)`}
      </p>
      <p>Max Temperature: {`${Math.round(tempMax)} °C`}</p>
      <p>Min Temperature: {`${Math.round(tempMin)} °C`}</p>
      <p>Feels like: {`${Math.round(feelsLike)} °C`}</p>
      <p>Pressure: {pressure} hpa</p>
      <p>Humidity: {humidity} %</p>
    </div>
  );
};

export default WeatherInfo;
