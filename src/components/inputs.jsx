import react from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

export default class Inputs extends react.Component {
  state = {
    result: [],
    position: "",
    location: "",
  };

  fetchData = async (e) => {
    e.preventDefault();
    console.log(this.state.position);
    const url = `https://api.allorigins.win/raw?url=https://jobs.github.com/positions.json${
      this.state.position.length !== 0
        ? `?description=${this.state.position}`
        : ""
    }${
      this.state.location.length !== 0
        ? this.state.position.length === 0
          ? `?location=${this.state.location}`
          : `&location=${this.state.location}`
        : ""
    }`;
    try {
      console.log(url);
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      this.setState({ result: data });
    } catch (error) {
      console.log(error);
    }
  };
  handleKeyPosition = async (e) => {
    const queryPosition = e.currentTarget.value;
    console.log(queryPosition);
    this.setState({ position: queryPosition });
  };

  handleKeyLocation = async (e) => {
    const queryLocation = e.currentTarget.value;
    console.log(queryLocation);
    this.setState({ location: queryLocation });
  };
  /*  componentDidMount = async () => {
    await this.fetchData();
  }; */
  /*   componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetching();
    }
  } */
  render() {
    return (
      <Container>
        <Row>
          <Form onSubmit={this.fetchData}>
            <Form.Group>
              <Col xs={6}>
                <Form.Control
                  type="text"
                  placeholder="POSITION"
                  value={this.state.position}
                  onChange={this.handleKeyPosition}
                />
              </Col>
              <Col xs={6}>
                <Form.Control
                  type="text"
                  value={this.state.location}
                  placeholder="LOCATION"
                  onChange={this.handleKeyLocation}
                />
              </Col>
              <Button variant="primary" type="submit">
                SEARCH
              </Button>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    );
  }
}
