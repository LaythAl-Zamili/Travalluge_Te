// Importing required packages
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, signupUser } from '../reducers/userReducer';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextInput } from './FormikMuiFields';
import { notify } from '../reducers/notificationReducer';
import AlertMessage from './AlertMessage';
import getErrorMsg from '../utils/getErrorMsg';

import {
  Button,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { useAuthStyles } from '../styles/muiStyles';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

// Defining the validation schema for the signup form
const validationSchemaSignup = yup.object({
  username: yup
    .string()
    .required('Required')
    .max(30, 'Must be at most 30 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /[a-zA-Z0-9-_]*$/,
      'Only alphanumeric characters allowed, no spaces/symbols'
    ),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
});

// Defining the validation schema for the login form
const validationSchemaLogin = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

// Defining the AuthForm component
const AuthForm = () => {
  const dispatch = useDispatch(); // Assigning useDispatch() hook to dispatch actions
  const [authType, setAuthType] = useState('login'); // Initializing the authType state with 'login' as default value
  const [showPass, setShowPass] = useState(false); // Initializing the showPass state with false as default value
  const [error, setError] = useState(null); // Initializing the error state with null as default value
  const classes = useAuthStyles(authType)(); // Assigning the custom styling hook with authType passed as a parameter

  // Defining handleLogin function to handle login submit
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true); // Setting submitting to true before the async call
      await dispatch(loginUser(values)); // Dispatching the loginUser action with form values
      dispatch(
        notify(`Welcome, ${values.username}. You're logged in!`, 'success') // Dispatching a notification with the success message
      );
    } catch (err) {
      setSubmitting(false); // Setting submitting to false in case of error
      setError(getErrorMsg(err)); // Setting the error state with the error message
    }
  };

  // Defining handleSignup function to handle signup submit
  const handleSignup = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true); // Setting submitting to true before the async call
      await dispatch(signupUser(values)); // Dispatching the signupUser action with form values
      dispatch(
        notify(
          `Welcome, ${values.username}. You've been successfully registered.`,
          'success'
        )
      );
    } catch (err) {
      setSubmitting(false);
      setError(getErrorMsg(err));
    }
  };

  return (
    <div>
      <div className={classes.authWrapper}>
        <Formik
          validateOnChange={true}
          initialValues={{ username: '', password: '', email: '' }}
          onSubmit={authType === 'login' ? handleLogin : handleSignup}
          validationSchema={
            authType === 'login'
              ? validationSchemaLogin
              : validationSchemaSignup
          }
        >
          {({ isSubmitting }) => (
            <>
              <Form className={classes.form}>
                <Typography
                  variant="h5"
                  color="primary"
                  className={classes.formTitle}
                >
                  {authType === 'login'
                    ? 'Login to your account'
                    : 'Create a new account'}
                </Typography>
                <div className={classes.input}>
                  <PersonIcon className={classes.inputIcon} color="primary" />
                  <TextInput
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    label="Username"
                    required
                    fullWidth
                  />
                </div>
                <div className={classes.input}>
                  <EmailIcon className={classes.inputIcon} color="primary" />
                  <TextInput
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    fullWidth
                  />
                </div>
                <div className={classes.input}>
                  <LockIcon className={classes.inputIcon} color="primary" />
                  <TextInput
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter password"
                    label="Password"
                    required
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPass((prevState) => !prevState)
                            }
                          >
                            {showPass ? (
                              <VisibilityOffIcon color="primary" />
                            ) : (
                              <VisibilityIcon color="primary" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                  startIcon={
                    authType === 'login' ? <ExitToAppIcon /> : <PersonAddIcon />
                  }
                  className={classes.submitButton}
                  disabled={isSubmitting}
                >
                  {authType === 'login'
                    ? isSubmitting
                      ? 'Logging In'
                      : 'Login'
                    : isSubmitting
                    ? 'Signing Up'
                    : 'Sign Up'}
                </Button>
              </Form>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <div className={classes.sidePanel}>
                <Typography
                  variant="h6"
                  className={classes.switchText}
                  color="primary"
                >
                  {authType === 'login'
                    ? `Don't have an account?`
                    : 'Already have an account?'}
                </Typography>
                <Button
                  onClick={() =>
                    authType === 'login'
                      ? setAuthType('signup')
                      : setAuthType('login')
                  }
                  fullWidth
                  size="large"
                  color="primary"
                  variant="outlined"
                  startIcon={
                    authType === 'login' ? <PersonAddIcon /> : <ExitToAppIcon />
                  }
                  disabled={isSubmitting}
                >
                  {authType === 'login' ? 'Sign Up' : 'Login'}
                </Button>
              </div>
            </>
          )}
        </Formik>
      </div>
      <div>
        <AlertMessage
          error={error}
          severity="error"
          clearError={() => setError(null)}
        />
      </div>
    </div>
  );
};

export default AuthForm;
