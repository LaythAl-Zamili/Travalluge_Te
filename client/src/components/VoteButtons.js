import React from 'react';
import AuthFormModal from './AuthFormModal';

import { Checkbox } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// UpvoteButton component
export const UpvoteButton = ({ user, body, handleUpvote, size }) => {
  return user ? (
    // If user is logged in
    <Checkbox
      checked={body.upvotedBy.includes(user.id)} // Determine if user has upvoted
      icon={<ArrowUpwardIcon style={{ color: '#b2b2b2' }} />} // Unchecked icon
      checkedIcon={<ArrowUpwardIcon style={{ color: '#FF8b60' }} />} // Checked icon
      onChange={handleUpvote} // Handle upvote action
      size={size || 'small'} // Checkbox size (default: 'small')
    />
  ) : (
    // If user is not logged in
    <AuthFormModal type="upvote" /> // Display authentication form/modal for upvote
  );
};

// DownvoteButton component
export const DownvoteButton = ({ user, body, handleDownvote, size }) => {
  return user ? (
    // If user is logged in
    <Checkbox
      checked={body.downvotedBy.includes(user.id)} // Determine if user has downvoted
      icon={<ArrowDownwardIcon style={{ color: '#b2b2b2' }} />} // Unchecked icon
      checkedIcon={<ArrowDownwardIcon style={{ color: '#9494FF' }} />} // Checked icon
      onChange={handleDownvote} // Handle downvote action
      size={size || 'small'} // Checkbox size (default: 'small')
    />
  ) : (
    // If user is not logged in
    <AuthFormModal type="downvote" /> // Display authentication form/modal for downvote
  );
};
