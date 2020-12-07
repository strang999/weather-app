import React from "react";
import WeatherServiceContext from "../WeatherServiceContext/WeatherServiceContext";

const WithWeatherService = () => (Wrapped) => {
  return (props) => {
    return (
      <WeatherServiceContext.Consumer>
        {(WeatherService) => {
          return <Wrapped {...props} WeatherService={WeatherService} />;
        }}
      </WeatherServiceContext.Consumer>
    );
  };
};

export default WithWeatherService;
