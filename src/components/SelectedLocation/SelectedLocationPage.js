import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Container, Icon } from "semantic-ui-react";
import WithWeatherService from "../hoc/WithWeatherService";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import * as actions from "../../actions/actions";
import Error from "../Error/Error";

const SelectedLocationPage = (props) => {
  const city = props.match.params.id;
  useEffect(() => {
    props.weatherRequested();
    const { WeatherService } = props;
    WeatherService.getWeatherOfCity(city)
      .then((data) => {
        props.weatherLoaded(data);
      })
      .catch((err) => {
        props.weatherDataError();
      });
  }, [city]);

  return props.error ? (
    <Error history={props.history} />
  ) : (
    <Container>
      <WeatherInfo weatherData={props.weatherData} />

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
  );
};
export default WithWeatherService()(
  connect((state) => state, actions)(withRouter(SelectedLocationPage))
);
