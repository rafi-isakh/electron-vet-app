import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import AddServiceForm from './AddServiceForm';import addServiceDialogStyle from './AddServiceDialogStyle';

export interface ServiceDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  dialogState: any;
  addService: any;
}

function AddServiceDialog(props: ServiceDialogProps) {
  const classes = addServiceDialogStyle();
  const { onClose, open, dialogState, addService } = props;

  const handleClose = () => {
    onClose("Close dialog")
  }

  return(
    <Dialog
      onClose={handleClose}
      aria-labelledby="add-patient-dialog" 
      open={open} 
      maxWidth="sm" 
      fullWidth={true}
      disableBackdropClick>
        <DialogTitle disableTypography id="add-service-dialog" className={classes.dialogTitle}>
          <PetsIcon className={classes.dialogTitleIcon}/>
          <h2>Data produk & layanan</h2>
        </DialogTitle>
        <AddServiceForm addDialogState={dialogState} addService={addService}/>
    </Dialog>
  )
}

export default AddServiceDialog