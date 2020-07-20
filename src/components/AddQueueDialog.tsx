import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import GroupIcon from '@material-ui/icons/Group';
import addQueueDialogStyle from "./AddQueueDialogStyle";
import AddQueueForm from "./AddQueueForm";

export interface AddQueueDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  dialogState: any;
  patients: any;
  addQueue: any;
}

function AddQueueDialog(props: AddQueueDialogProps) {
  const classes = addQueueDialogStyle()
  const { onClose, open, dialogState, patients, addQueue } = props;

  const handleClose = () => {
    onClose("Close dialog");
  };

  return (
    <Dialog 
      onClose={handleClose}
      aria-labelledby="add-patient-dialog" 
      open={open} 
      maxWidth="sm" 
      fullWidth={true}
      disableBackdropClick>
      <DialogTitle disableTypography id="simple-dialog-title" className={classes.dialogTitle}>
        <GroupIcon className={classes.dialogTitleIcon}/>
        <h2>Antrian baru</h2>
      </DialogTitle>
      <AddQueueForm addDialogState={dialogState} addQueue={addQueue} patients={patients}/>
    </Dialog>
  );
}

export default AddQueueDialog;