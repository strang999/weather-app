import Axios from "axios";
import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";
import "./HomePage.scss";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import WithWeatherService from "../hoc/WithWeatherService";
import * as actions from "../../actions/actions";
export class HomePage extends Component {
  // getPosition = () => {
  //   return new Promise(function (resolve, reject) {
  //     navigator.geolocation.getCurrentPosition(resolve, reject);
  //   });
  // };

  // getWeather = async (latitude, longitude) => {
  //   const api_call = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
  //   );
  //   const data = await api_call.json();
  //   console.log("data is: ", data);
  //   this.setState({
  //     lat: latitude,
  //     lon: longitude,
  //     location: data.name,
  //     temperatureC: Math.round(data.main.temp),
  //     temperatureF: Math.round(data.main.temp * 1.8 + 32),
  //     icon: data.weather[0].icon,
  //     humidity: data.main.humidity,
  //     pressure: data.main.pressure,
  //     description: data.weather[0].main && data.weather[0].description,
  //     feelsLike: data.main.feelsLike,
  //     tempMax: Math.round(data.main.temp_max),
  //     tempMin: Math.round(data.main.temp_min),
  //   });
  // };

  getWeatherOfCity = () => {
    this.setState({ loading: true });
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.region}&units=metric&APPID=${process.env.REACT_APP_WEATHER_KEY}`
    )
      .then(({ data }) => {
        console.log("axios", data);
        this.setState({
          loading: false,
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
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMessage: error });
      });
  };
  componentDidMount() {
    // this.getPosition()
    //   .then((position) => {
    //     this.getWeather(position.coords.latitude, position.coords.longitude);
    //   })
    //   .catch((err) => console.log(err.message));
    this.props.weatherRequested();
    const { WeatherService } = this.props;
    WeatherService.getPosition()
      .then((position) => {
        WeatherService.getWeather(
          position.coords.latitude,
          position.coords.longitude
        ).then((data) => {
          console.log("this", data);
          this.props.weatherLoaded(data);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  componentDidCatch() {
    this.props.weatherDataError();
  }
  render() {
    console.log(this.props);
    const { loading, country, region, error } = this.props;
    const {
      location,
      temperatureC,
      temperatureF,
      feelsLike,
      icon,
      errorMessage,
      humidity,
      pressure,
      description,
      tempMax,
      tempMin,
      flag,
    } = this.props.weatherData;
    return loading ? (
      <Loader />
    ) : (
      <>
        <List>
          <List.Item>
            <Image
              avatar
              alt={flag}
              src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${flag}.svg`}
            />
            <span>{location}</span>
          </List.Item>

          <List.Item>Conditions: {description} </List.Item>
          <List.Item>
            Temperature:{" "}
            {`${Math.round(temperatureC)} °C (${Math.round(
              temperatureF * 1.8 + 32
            )} °F)`}
          </List.Item>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt=""
          />
          <List.Item>Max Temperature: {`${tempMax} °C`}</List.Item>
          <List.Item>Min Temperature: {`${tempMin} °C`}</List.Item>
          <List.Item>Pressure: {pressure} hpa</List.Item>
          <List.Item>Humidity: {humidity} %</List.Item>
          <List.Item>Feels like: {`${Math.round(feelsLike)} °C`}</List.Item>
        </List>
        <hr />
        <CountryDropdown
          className="select"
          value={country}
          onChange={(val) => this.props.selectCountry(val)}
        />
        <RegionDropdown
          className="select"
          country={country}
          value={region}
          onChange={(val) => this.props.selectRegion(val)}
        />
        <Button>
          <Link to={`/city/${region}`}>
            {region
              ? `Search weather in ${region}`
              : "Search weather in the region"}
          </Link>
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData,
    loading: state.loading,
    country: state.country,
    region: state.region,
    error: state.error,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     weatherLoaded: (newWeather) => {
//       dispatch({ type: "WEATHER_DATA_LOADED", payload: newWeather });
//     },
//   };
// };
export default WithWeatherService()(
  connect(mapStateToProps, actions)(HomePage)
);
