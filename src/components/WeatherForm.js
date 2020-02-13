import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const WeatherForm = props => {
  const { handleInput, cityName, addCity } = props;
  
  return ( 
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Weather App</Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline onSubmit={addCity}>
          <FormControl type="text" autoFocus placeholder="Enter city name" className="mr-sm-2" value={cityName} onChange={handleInput}/>
          <Button variant="outline-dark" type="submit">Add</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
 
export default WeatherForm;