// Importing React and the Error404 SVG component as a React component
import React from 'react';
import { ReactComponent as Error404 } from '../svg/404-error.svg';

// Importing Typography, SvgIcon, and ErrorOutlineIcon components from Material-UI
import { Typography, SvgIcon } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

// Defining the ErrorPage component with a parameter 'errorMsg'
const ErrorPage = ({ errorMsg }) => {
  // Checking if the error message includes specific strings to determine if it's a "Not Found" error
  const isNotFoundError =
    errorMsg.includes('does not exist') || errorMsg.includes('Malformatted');

  // Returning the JSX markup
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      {isNotFoundError ? (
        // Displaying the Error404 SVG icon if it's a "Not Found" error
        <SvgIcon
          color="primary"
          style={{ fontSize: '8em', marginBottom: '0.5em' }}
        >
          <Error404 />
        </SvgIcon>
      ) : (
        // Displaying the ErrorOutlineIcon if it's not a "Not Found" error
        <ErrorOutlineIcon
          color="primary"
          style={{ fontSize: '8em', marginBottom: '0.5em' }}
        />
      )}
      <Typography color="secondary" variant="h4">
        {/* Displaying "404 Not Found" if it's a "Not Found" error, otherwise displaying "Error" */}
        {isNotFoundError ? `404 Not Found` : 'Error'}
      </Typography>
      <Typography color="secondary" variant="h6">
        {/* Displaying the error message */}
        {errorMsg}
      </Typography>
    </div>
  );
};

// Exporting the ErrorPage component as the default export
export default ErrorPage;
