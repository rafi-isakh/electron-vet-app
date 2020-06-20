import detailDialogStyle from './DetailDialogStyle';
import { Dialog, DialogTitle, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface DetailDialogProps {
  open: boolean;
  activeProfile: string;
  onClose: (value: string) => void;
}

function DetailDialog(props: DetailDialogProps) {
  const classes = detailDialogStyle()
  const { activeProfile, onClose,  open } = props;

  const handleClose = () => {
    onClose("Close dialog");
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="lg" fullWidth={true}>
      <DialogTitle disableTypography id="simple-dialog-title" className={classes.dialogTitle}>
        <PersonIcon className={classes.dialogTitleIcon}/>
        <h2>{activeProfile}</h2>
      </DialogTitle>
      <List>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default DetailDialog;