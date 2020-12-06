import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";
import WithWeatherService from "../hoc/WithWeatherService";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import * as actions from "../../actions/actions";

const SelectedLocationPage = (props) => {
  const city = props.match.params.id;
  console.log(props);
  console.log(city);
  // const {
  //   location,
  //   temperatureC,
  //   temperatureF,
  //   feelsLike,
  //   icon,
  //   errorMessage,
  //   humidity,
  //   pressure,
  //   description,
  //   tempMax,
  //   tempMin,
  //   flag,
  // } = this.props.weatherData;

  useEffect(() => {
    props.weatherRequested();
    const { WeatherService } = props;
    WeatherService.getWeatherOfCity(city)
      .then((data) => {
        console.log("city", data);
        props.weatherLoaded(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [city]);
  const { loading, country, region, error } = props;
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
  } = props.weatherData;
  return (
    <>
      <Container>
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
          <p style={{ fontSize: "18px" }}>Conditions: {description} </p>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather_icon"
          />
          <p>
            Temperature:{" "}
            {`${Math.round(temperatureC)} °C (${Math.round(
              temperatureF * 1.8 + 32
            )} °F)`}
          </p>
          <p>Max Temperature: {`${tempMax} °C`}</p>
          <p>Min Temperature: {`${tempMin} °C`}</p>
          <p>Feels like: {`${Math.round(feelsLike)} °C`}</p>
          <p>Pressure: {pressure} hpa</p>
          <p>Humidity: {humidity} %</p>
        </div>

        <Button
          animated="vertical"
          position="center"
          onClick={props.history.goBack}
        >
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
      </Container>
    </>
  );
};
export default WithWeatherService()(
  connect((state) => state, actions)(withRouter(SelectedLocationPage))
);
