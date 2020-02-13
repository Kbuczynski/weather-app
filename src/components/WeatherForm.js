import React from 'react';
import { Navbar, Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';

const WeatherForm = props => {
  const { handleInput, cityName, addCity, sortByTemperature, sortByCity } = props;
  
  return ( 
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Weather App</Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline onSubmit={addCity}>
          <FormControl type="text" required autoFocus placeholder="Enter city name" className="mr-sm-2" value={cityName} onChange={handleInput}/>
          <Button variant="outline-dark" type="submit" className="mr-sm-2">Add</Button>
        </Form>

        <DropdownButton id="dropdown-basic-button" title="Sort by city" variant="outline-dark" className="mr-sm-2"> 
          <Dropdown.Item onClick={sortByCity} href="asc">A-Z</Dropdown.Item>
          <Dropdown.Item onClick={sortByCity} href="desc">Z-A</Dropdown.Item>
        </DropdownButton>

        <DropdownButton id="dropdown-basic-button" title="Sort by temperature" variant="outline-dark">
          <Dropdown.Item onClick={sortByTemperature} href="asc">Ascending</Dropdown.Item>
          <Dropdown.Item onClick={sortByTemperature} href="desc">Descending</Dropdown.Item>
        </DropdownButton>
      </Navbar.Collapse>
    </Navbar>
  );
}
 
export default WeatherForm;