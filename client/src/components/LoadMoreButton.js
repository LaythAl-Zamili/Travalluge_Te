import React from 'react';
import { Button } from '@material-ui/core';
import { usePostListStyles } from '../styles/muiStyles';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const LoadMoreButton = ({ handleLoadPosts, loading }) => {
  // useStyles hook from the 'muiStyles' module to apply custom styles to the button
  const classes = usePostListStyles();

  return (
    <div className={classes.loadBtnWrapper}>
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={handleLoadPosts}
        startIcon={<AutorenewIcon />}
        className={classes.loadBtn}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load more'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
