import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import WeatherService from "./services/weatherService";
import WeatherServiceContext from "./components/WeatherServiceContext/WeatherServiceContext";

const weatherService = new WeatherService();
ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <WeatherServiceContext.Provider value={weatherService}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WeatherServiceContext.Provider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
