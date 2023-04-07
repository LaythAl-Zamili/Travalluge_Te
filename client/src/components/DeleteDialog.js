import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteDialog = ({ title, handleDelete, handleMenuClose, type }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (type !== 'comment' && type !== 'avatar') {
      handleMenuClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = () => {
    handleDelete();
    handleClose();
  };

  return (
    <div>
      {type === 'comment' ? (
        <Button
          onClick={handleClickOpen}
          size="small"
          color="inherit"
          startIcon={<DeleteIcon />}
          style={{ textTransform: 'none' }}
        >
          Delete
        </Button>
      ) : type === 'avatar' ? (
        <Button
          onClick={handleClickOpen}
          size="small"
          color="default"
          variant="outlined"
          startIcon={<DeleteIcon />}
          style={{ textTransform: 'none', backgroundColor: '#ed4444' }}
        >
          Remove
        </Button>
      ) : (
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <DeleteIcon style={{ marginRight: 7 }} />
            Delete
          </ListItemIcon>
        </MenuItem>
      )}
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>
          {type === 'comment'
            ? 'Delete Comment?'
            : type === 'avatar'
            ? 'Remove profile picture?'
            : 'Delete Post?'}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {type === 'comment'
              ? `Do you really want to delete your comment?`
              : type === 'avatar'
              ? 'Do you really want to remove your profile picture?'
              : `Do you really want to delete your post titled '${title}'? You
              can't undo this.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleActionClick}
            color="primary"
            variant="contained"
            size="small"
          >
            {type === 'comment'
              ? 'Delete Comment'
              : type === 'avatar'
              ? 'Remove profile picture'
              : 'Delete Post'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
