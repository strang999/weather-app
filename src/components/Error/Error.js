import React from "react";
import { Button, Container, Header, Icon } from "semantic-ui-react";

const Error = (props) => {
  return (
    <div>
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="dont" circular />
          <Header.Content>
            Error. Seems like no data about this region...
          </Header.Content>
        </Header>
        <Button
          animated="vertical"
          position="center"
          onClick={() => props.history.push("/")}
        >
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
      </Container>
    </div>
  );
};

export default Error;
