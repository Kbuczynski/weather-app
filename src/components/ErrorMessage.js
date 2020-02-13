import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = props => {
    const { closeError } = props;

    return ( 
        <Alert variant="danger" onClose={closeError} dismissible>
            <Alert.Heading>Something went wrong!</Alert.Heading>
            <p>You probably made a typo or the city you are looking for is not in the database, please try again!</p>
        </Alert>
    );
}
 
export default ErrorMessage;