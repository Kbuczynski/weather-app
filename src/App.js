import React, { Component } from 'react';
import WeatherInfo from './components/WeatherInfo';
import WeatherForm from './components/WeatherForm';

class App extends Component {
	constructor(props) {
    super(props);
    
		this.state = {
      latitude: 0,
      longitude: 0,
      cityName: '',
      cities: [],
      data: []
    };
  }
  
  getCoordinates = () => {   
    const { geolocation } = navigator;

    if (geolocation) {
        geolocation.getCurrentPosition(({coords}) => {
            const { latitude, longitude } = coords;

            this.setState({ latitude: latitude, longitude: longitude  });
        });
    }
  }

  isRepeats = cityData => {
    return this.state.data.filter(element => {
      return element.name === cityData.name; 
    });
  }

	handleInput = e => {
    const cityName = e.target.value;

		if (isNaN(cityName)) this.setState({ cityName: cityName });
  };

	addCity = e => {
    e.preventDefault();
    
    this.setState(state => {
      const cities = [...state.cities, state.cityName];

      return {
        cities,
        cityName: ''
      };
    });
  };

  deleteCity = e => {
    e.preventDefault();

    const cityId = parseInt(e.target.value);
    const { data } = this.state;

    const cityToDelete = data.find(city => {
      return city.id === cityId;
    });

    this.setState(state => {
      const data = state.data.filter(data => data.id !== cityId);
      const cities = state.cities.filter(name => name.toUpperCase() !== cityToDelete.name.toUpperCase());

      return {
        cities,
        data
      };
    });
  }
  
  getData = () => {
    const API_KEY = 'bf8a723e43bdef32b04b4cf5071a3b77';
    const { cities } = this.state;

    cities.map(async city => {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

		  const response = await fetch(API_URL);
      const cityData = await response.json();

      if (this.isRepeats(cityData).length === 0 && cityData.cod === 200) {
        this.setState(state => {
          const data = [...state.data, cityData];
      
          return {
            data
          };
        });
      }
    });
  }

  componentDidMount() {
    this.getCoordinates();
  }

  componentDidUpdate(_, nextState) {
    if (this.state.cities !== nextState.cities) this.getData();
  }

	render() {
    const { data } = this.state;
    const { handleInput, addCity, deleteCity } = this;

		return (
			<>
				<WeatherForm handleInput={handleInput} addCity={addCity} />
				<WeatherInfo data={data} deleteCity={deleteCity} />
			</>
		);
	}
}

export default App;