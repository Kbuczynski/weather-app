import React, { Component } from "react";
import "./app.scss";

import WeatherInfo from "./components/WeatherInfo";
import WeatherForm from "./components/WeatherForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      data: [],
      show: false
    };
  }

  handleInput = e => {
    this.setState({ city: e.target.value });
  };

  handleClick = async e => {
    e.preventDefault();

    const API_KEY = "bf8a723e43bdef32b04b4cf5071a3b77";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(API_URL);
    const data = await response.json();

    this.setState({ data: data, show: true });
  };

  render() {
    const { data, show } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Weather App</h1>
        <div className="app__container">
          <WeatherForm
            handleInput={this.handleInput}
            handleClick={this.handleClick}
          />
          {show ? (
            <WeatherInfo data={data} />
          ) : (
            <p>Check the weather in your city!</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
