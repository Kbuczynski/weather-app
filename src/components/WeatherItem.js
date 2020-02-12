import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherItem = props => {
    const { city, deleteCity } = props;

    const { name, id } = city;
    const { temp } = city.main;

    return ( 
        <tr>
          <td>{name}</td>
          <td>{temp} ℃</td>
          <td><Button variant="danger" value={id} onClick={deleteCity}>X</Button></td>
        </tr>
     );
}
 
export default WeatherItem;