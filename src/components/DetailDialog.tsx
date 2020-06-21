import detailDialogStyle from './DetailDialogStyle';
import { Dialog, DialogTitle } from '@material-ui/core';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import DetailTab from './DetailTab';


export interface DetailDialogProps {
  open: boolean;
  activeProfile: string;
  onClose: (value: string) => void;
  pets: Array<any>;
}

function DetailDialog(props: DetailDialogProps) {
  const classes = detailDialogStyle()
  const { pets, activeProfile, onClose, open } = props;

  const handleClose = () => {
    onClose("Close dialog");
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="lg" fullWidth={true}>
      <DialogTitle disableTypography id="simple-dialog-title" className={classes.dialogTitle}>
        <PersonIcon className={classes.dialogTitleIcon}/>
        <h2>{activeProfile}</h2>
      </DialogTitle>
      <DetailTab pets={pets}/>
    </Dialog>
  );
}

export default DetailDialog;