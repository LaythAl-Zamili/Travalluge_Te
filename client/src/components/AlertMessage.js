import React from 'react';

import { Alert, AlertTitle } from '@material-ui/lab';
import { useAlertStyles } from '../styles/muiStyles';

const AlertMessage = ({ severity, error, clearError }) => {
  const classes = useAlertStyles();

  // If there is no error, render null
  if (!error) {
    return null;
  }

  return (
    <div className={classes.root}>
      {/* Display an alert with the specified severity and call clearError when closed */}
      <Alert severity={severity} onClose={clearError}>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </div>
  );
};

export default AlertMessage;
