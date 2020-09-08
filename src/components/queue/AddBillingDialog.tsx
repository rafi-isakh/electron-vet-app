import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import addQueueDialogStyle from './AddQueueDialogStyle';
import AddBillingForm from './AddBillingForm';

export interface AddBillingProps {
  activeProfile: any;
  billing: any;
  open: boolean;
  onClose: (value: string) => void;
  dialogState: any;
}

function AddBillingDialog(props: AddBillingProps) {
  const classes = addQueueDialogStyle();
  const { onClose, open, dialogState, billing, activeProfile } = props;

  const handleClose = () => {
    onClose("Close dialog")
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="add-billing-dialog"
      open={open}
      maxWidth="md"
      fullWidth={true}
      disableBackdropClick>
    <DialogTitle disableTypography id="edit-dialog-title" className={classes.dialogTitle}>
      <ReceiptIcon className={classes.dialogTitleIcon}/>
        <h2>Data pembayaran</h2>
      </DialogTitle>
      <AddBillingForm editDialogState={dialogState} billing={billing} activeProfile={activeProfile}/>
    </Dialog>
  )
}

export default AddBillingDialog;