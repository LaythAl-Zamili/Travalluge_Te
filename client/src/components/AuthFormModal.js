import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthForm from './AuthForm';

import { DialogTitle } from './CustomDialogTitle';
import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  MenuItem,
  useMediaQuery,
  ListItemIcon,
} from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import { useNavStyles } from '../styles/muiStyles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AuthFormModal = ({ closeMobileMenu, type }) => {
  const classes = useDialogStyles();
  const classesBtn = useNavStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMobileMenu = () => {
    handleClickOpen();
    closeMobileMenu();
  };

  return (
    <div>
      {/* Render different UI components based on the value of the 'type' prop */}
      {type === 'upvote' ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={isMobile ? 'small' : 'medium'}
        >
          <ArrowUpwardIcon style={{ color: '#00D5FA' }} />
        </IconButton>
      ) : type === 'downvote' ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={isMobile ? 'small' : 'medium'}
        >
          <ArrowDownwardIcon style={{ color: '#00D5FA' }} />
        </IconButton>
      ) : isMobile ? (
        <MenuItem onClick={handleMobileMenu}>
          <ListItemIcon>
            <ExitToAppIcon style={{ marginRight: 7 }} />
            Login/Register
          </ListItemIcon>
        </MenuItem>
      ) : (
        <Button
          color="secondary"
          onClick={handleClickOpen}
          className={classesBtn.navButtons}
          style={{ border: '1px solid white', marginRight: '10px' }}
        >
          Login/Register
        </Button>
      )}
      {/* Dialog component for displaying the authentication form */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleClose}></DialogTitle>
        <DialogContent>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

AuthFormModal.propTypes = {
  closeMobileMenu: PropTypes.func,
};

export default AuthFormModal;
