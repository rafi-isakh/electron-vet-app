import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import EditServiceForm from './EditServiceForm';
import addServiceDialogStyle from './AddServiceDialogStyle';

export interface EditDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  dialogState: any;
  editService: any;
  currentData: any;
  activeProfile: any;
}

function EditServiceDialog(props: EditDialogProps) {
  const classes = addServiceDialogStyle();
  const { onClose, open, dialogState, editService, currentData, activeProfile } = props;
  const handleClose = () => {
    onClose("Close dialog");
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="edit-service-dialog"
      open={open}
      maxWidth="sm"
      fullWidth={true}
      disableBackdropClick>
        <DialogTitle disableTypography id="edit-dialog-title" className={classes.dialogTitle}>
          <PetsIcon className={classes.dialogTitleIcon}/>
          <h2>Data Produk dan Layanan</h2>
        </DialogTitle>
        <EditServiceForm
          editDialogState={dialogState}
          editService={editService}
          activeProfile={activeProfile}
          currentData={currentData}/>
    </Dialog>
  )
}

export default EditServiceDialog;