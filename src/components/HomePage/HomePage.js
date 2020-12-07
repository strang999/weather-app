import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Button, Container } from "semantic-ui-react";
import "./HomePage.scss";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import WithWeatherService from "../hoc/WithWeatherService";
import * as actions from "../../actions/actions";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import Error from "../Error/Error";
export class HomePage extends Component {
  componentDidMount() {
    this.props.weatherRequested();
    const { WeatherService } = this.props;
    WeatherService.getPosition()
      .then((position) => {
        WeatherService.getWeather(
          position.coords.latitude,
          position.coords.longitude
        ).then((data) => {
          this.props.weatherLoaded(data);
        });
      })
      .catch((err) => {
        WeatherService.getWeather(50.48, 30.43).then((data) => {
          this.props.weatherLoaded(data);
        });
        alert(
          "You have disabled location service. Allow Weather app to access your location. Your current location will be used for calculating Real time weather."
        );
        this.props.weatherDataError();
      });
  }
  componentDidCatch() {
    this.props.weatherDataError();
  }
  render() {
    const { loading, country, region, error } = this.props;

    return loading ? (
      <Loader />
    ) : error ? (
      <Error />
    ) : (
      <>
        <Container>
          <WeatherInfo weatherData={this.props.weatherData} />
          <hr />
          <CountryDropdown
            className="select"
            value={country}
            onChange={(val) => this.props.selectCountry(val)}
          />
          <br></br>
          <RegionDropdown
            className="select"
            country={country}
            value={region}
            onChange={(val) => this.props.selectRegion(val)}
          />
          <br></br>
          <Button style={{ margin: "5px" }}>
            <Link to={`/city/${region}`}>
              {region
                ? `Search weather in ${region}`
                : "Search weather in the region"}
            </Link>
          </Button>
        </Container>
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

export default WithWeatherService()(
  connect(mapStateToProps, actions)(HomePage)
);
