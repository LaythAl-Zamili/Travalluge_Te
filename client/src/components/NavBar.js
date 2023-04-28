import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logoutUser } from '../reducers/userReducer';
import { notify } from '../reducers/notificationReducer';
import MobileUserMenu from './MobileUserMenu';
import DesktopUserMenu from './DesktopUserMenu';
import SearchBar from './SearchBar';

import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import logote from './logote.ico';
import SearchIcon from '@material-ui/icons/Search';

const NavBar = () => {
  const [searchOpen, setSearchOpen] = useState(false); // State to keep track of search bar open/close
  const user = useSelector((state) => state.user); // Accessing user data from Redux store
  const dispatch = useDispatch(); // Accessing Redux dispatch function
  const theme = useTheme(); // Accessing Material-UI theme
  const isMobile = useMediaQuery(theme.breakpoints.down('xs')); // Checking if screen size is mobile
  const classes = useNavStyles(); // Custom styles for the navigation bar

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatching logoutUser action from userReducer
    dispatch(notify(`u/${user.username} logged out`, 'success')); // Dispatching notify action from notificationReducer with a success message
  };

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar disableGutters={isMobile}>
        {!searchOpen && (
          <>
            <div className={classes.leftPortion}>
              <div className={classes.logoWrapper}>
                <Button
                  className={classes.logo}
                  color="secondary"
                  component={RouterLink}
                  to="/"
                  startIcon={<img src={logote} alt="My icon" />}
                  size="large"
                >
                  Travalluge
                </Button>
                <Typography variant="caption" color="textSecondary">
                  Check out our:
                  <Link
                    href={'https://tripnave12.netlify.app/'}
                    color="secondary"
                    target="_blank"
                    rel="layt"
                  >
                    <strong>{`Tripnave12`}</strong>
                  </Link>
                </Typography>
              </div>
              {!isMobile && <SearchBar />} {/* Render SearchBar component if not in mobile view */}
            </div>
            {isMobile ? (
              <>
                <IconButton
                  color="default"
                  className={classes.searchBtn}
                  onClick={() => setSearchOpen((prevState) => !prevState)} // Toggle search bar open/close on click
                >
                  <SearchIcon />
                </IconButton>
                <MobileUserMenu user={user} handleLogout={handleLogout} />
              </>
            ) : (
              <DesktopUserMenu user={user} handleLogout={handleLogout} />
            )}
          </>
        )}
        {searchOpen && isMobile && (
          <SearchBar isMobile={true} setSearchOpen={setSearchOpen} /> // Render SearchBar component with mobile prop if search bar is open in mobile view
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
