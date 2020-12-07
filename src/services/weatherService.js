export default class WeatherService {
  baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `${this.baseUrl}lat=${latitude}&lon=${longitude}&APPID=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
    );
    const data = await api_call.json();
    return data;
  };
  getWeatherOfCity = async (region) => {
    const api_call = await fetch(
      `${this.baseUrl}q=${region}&units=metric&APPID=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const data = await api_call.json();
    return data;
  };
}
