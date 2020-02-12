import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const WeatherForm = props => {
  const { handleInput, addCity } = props;
  
  return ( 
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Weather App</Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <FormControl type="text" autoFocus placeholder="Enter english city name" className="mr-sm-2" onInput={handleInput} />
          <Button variant="outline-dark" onClick={addCity}>Add</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
   );
}
 
export default WeatherForm;