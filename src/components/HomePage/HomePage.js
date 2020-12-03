import React, { Component } from "react";
export class HomePage extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    location: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    icon: undefined,
    errorMessage: undefined,
    humidity: undefined,
    pressure: undefined,
    description: undefined,
    feelsLike: undefined,
    tempMax: undefined,
    tempMin: undefined,
  };
  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
    );
    const data = await api_call.json();
    console.log("data is: ", data);
    this.setState({
      lat: latitude,
      lon: longitude,
      location: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].main && data.weather[0].description,
      feelsLike: data.main.feelsLike,
      tempMax: Math.round(data.main.temp_max),
      tempMin: Math.round(data.main.temp_min),
    });
  };

  componentDidMount() {
    this.getPosition()
      .then((position) => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch((err) => console.log(err.message));
  }

  render() {
    const {
      location,
      temperatureC,
      temperatureF,
      icon,
      errorMessage,
      humidity,
      pressure,
      description,
      tempMax,
      tempMin,
    } = this.state;
    return (
      <div>
        <h2>Weather app</h2>
        <p>Location: {location}</p>
        <p>Conditions: {description} </p>
        <p>Temperature: {`${temperatureC} °C (${temperatureF} °F)`} </p>
        <p>Max Temperature: {`${tempMax} °C`}</p>
        <p>Min Temperature: {`${tempMin} °C`}</p>
        <p>Pressure: {pressure} hpa</p>
        <p>Humidity: {humidity} %</p>
      </div>
    );
  }
}

export default HomePage;
