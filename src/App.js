import React, { Component } from 'react';
import WeatherInfo from './components/WeatherInfo';
import WeatherForm from './components/WeatherForm';
import ErrorMessage from "./components/ErrorMessage";

const API_KEY = 'bf8a723e43bdef32b04b4cf5071a3b77';

class App extends Component {
	constructor(props) {
    super(props);
    
		this.state = {
      cityName: '',
      data: [],
      error: false
    };
  }

	handleInput = e => {
    const cityName = e.target.value;
    
		this.setState({ cityName: cityName });
  };

	addCity = e => {
    e.preventDefault();

    this.getData();
    this.setState({ cityName: '' });
  };

  deleteCity = e => {
    e.preventDefault();

    const cityId = parseInt(e.target.value);

    this.setState(state => {
      const data = state.data.filter(data => data.id !== cityId);

      return {
        data
      };
    });
  }

  getCoordinates = () => {   
    const { geolocation } = navigator;
    const { addToData } = this;

    if (geolocation) {
        geolocation.getCurrentPosition(async ({coords}) => {
          const { latitude, longitude } = coords;

          const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          const response = await fetch(API_URL);
          const currentCityData = await response.json();

          addToData(currentCityData);
        });
    }
  }
  
  getData = async () => {
    const { cityName } = this.state;
    const { addToData, isRepeats, handleError, closeError } = this;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      
    const response = await fetch(API_URL);
       
    if (response.ok) {
      const cityData = await response.json();
  
      if (isRepeats(cityData) && cityData.cod === 200) {
        addToData(cityData);
        closeError();
      } else handleError();

    } else handleError();
  }

  sortByTemperature = e => {
    e.preventDefault();

    const method = e.target.href.split("/")[e.target.href.split("/").length - 1];

    this.setState(state => {
      const data = state.data.sort((a, b) => {
        const tempA = a.main.temp;
        const tempB = b.main.temp;

        return this.comparison(method, tempA, tempB);
      });

      return {
        data
      };
    });
  }

  sortByCity = e => {
    e.preventDefault();

    const method = e.target.href.split("/")[e.target.href.split("/").length - 1];

    this.setState(state => {
      const data = state.data.sort((a, b) => {
        const cityA = a.name.toUpperCase();
        const cityB = b.name.toUpperCase();
        
        return this.comparison(method, cityA, cityB);
      });

      return {
        data
      };
    });
  }

  comparison = (method, tempA, tempB) => {
    let comparison = 0;

    if (method === "asc")
      comparison = this.ascendingComparison(tempA, tempB);
    else if (method === "desc")
      comparison = this.descendingComparison(tempA, tempB);

    return comparison;
  }

  ascendingComparison = (a, b) => {
    const itemA = a;
    const itemB = b;

    let comparison = 0;

    if (itemA > itemB) comparison = 1;
    else if (itemA < itemB) comparison = -1;

    return comparison;
  }

  descendingComparison = (a, b) => {
    const itemA = a;
    const itemB = b;

    let comparison = 0;

    if (itemA > itemB) comparison = -1;
    else if (itemA < itemB) comparison = 1;

    return comparison;
  }

  addToData = city => {
    this.setState(state => {
      const data = [...state.data, city];
      
      return {
        data
      };
    });
  }

  isRepeats = cityData => this.state.data.filter(element => element.name === cityData.name).length === 0;

  handleError = () => this.setState({ error: true });

  closeError = () => this.setState({ error: false });

  componentDidMount() {
    this.getCoordinates();
  }

	render() {
    const { cityName, data, error } = this.state;
    const { handleInput, addCity, deleteCity, closeError, sortByTemperature, sortByCity } = this;

		return (
			<>
				<WeatherForm handleInput={handleInput} cityName={cityName} addCity={addCity} sortByTemperature={sortByTemperature} sortByCity={sortByCity}/>
        {error && <ErrorMessage closeError={closeError} />}
				<WeatherInfo data={data} deleteCity={deleteCity} />
			</>
		);
	}
}

export default App;