import Axios from "axios";

export default class WeatherService {
  baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
  api = "26e5894d8e40378c9182380d03f1222c";
  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `${this.baseUrl}lat=${latitude}&lon=${longitude}&APPID=${this.api}&units=metric`
    );
    const data = await api_call.json();
    return data;
    // this.setState({
    //   lat: latitude,
    //   lon: longitude,
    //   location: data.name,
    //   temperatureC: Math.round(data.main.temp),
    //   temperatureF: Math.round(data.main.temp * 1.8 + 32),
    //   icon: data.weather[0].icon,
    //   humidity: data.main.humidity,
    //   pressure: data.main.pressure,
    //   description: data.weather[0].main && data.weather[0].description,
    //   feelsLike: data.main.feelsLike,
    //   tempMax: Math.round(data.main.temp_max),
    //   tempMin: Math.round(data.main.temp_min),
    // });
  };
  getWeatherOfCity = async (region) => {
    const api_call = await fetch(
      `${this.baseUrl}q=${region}&units=metric&APPID=${this.api}`
    );
    const data = await api_call.json();
    return data;
  };

  // getWeatherOfCity = (region) => {
  //   // this.setState({ loading: true });
  //   Axios.get(
  //     `${this.baseUrl}q=${region}&units=metric&APPID=${this.api}`
  //   ).then((response) => {
  //     const res = response.data;
  //     console.log(res);
  //     return res;
  //   });
  //     this.setState({
  //       loading: false,
  //       location: data.name,
  //       temperatureC: Math.round(data.main.temp),
  //       temperatureF: Math.round(data.main.temp * 1.8 + 32),
  //       icon: data.weather[0].icon,
  //       humidity: data.main.humidity,
  //       pressure: data.main.pressure,
  //       description: data.weather[0].main && data.weather[0].description,
  //       feelsLike: data.main.feelsLike,
  //       tempMax: Math.round(data.main.temp_max),
  //       tempMin: Math.round(data.main.temp_min),
  //     });
  // })
  // .catch((error) => {
  //   console.log(error);
  //   this.setState({ errorMessage: error });
  // });
}
