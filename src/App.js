import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import { Redirect, Route, Switch } from "react-router-dom";
import Particles from "react-particles-js";
import SelectedLocationPage from "./components/SelectedLocation/SelectedLocationPage";
import { Header, Icon } from "semantic-ui-react";

const App = () => {
  return (
    <div className="app">
      <Particles
        id="particles"
        style={{
          position: "absolute",
          zIndex: -50,
        }}
        height="100%"
        width="100%"
        params={{
          particles: {
            color: {
              value: "#0000",
            },
            line_linked: {
              enable: false,
            },
            number: {
              value: 40,
            },
            size: {
              value: 6,
            },
            move: {
              direction: "bottom",
              out_mode: "out",
            },
          },
        }}
      />
      <Header className="header" as="h2" icon textAlign="center">
        <Icon name="sun" circular />
        <Header.Content>Weather App</Header.Content>
      </Header>
      <Switch>
        <Route path="/" exact component={HomePage} />

        <Route path="/city/:id">
          <SelectedLocationPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
