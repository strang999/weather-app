import React from "react";
import { Header, Icon } from "semantic-ui-react";
import "./Error.scss";
const Error = () => {
  return (
    <div className="error">
      <Header as="h1" icon textAlign="center">
        <Icon name="dont" circular />
        <Header.Content>Error... Something went wrong</Header.Content>
      </Header>
    </div>
  );
};

export default Error;
