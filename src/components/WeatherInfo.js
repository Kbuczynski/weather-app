import React from 'react';
import WeatherItem from "./WeatherItem";
import { Table } from 'react-bootstrap';

const WeatherInfo = props => {
  const { data, deleteCity } = props;

  return ( 
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((city, index) => {
            return <WeatherItem key={index} city={city} deleteCity={deleteCity}/>
          })
        }
      </tbody>
    </Table>
  );
}
 
export default WeatherInfo;