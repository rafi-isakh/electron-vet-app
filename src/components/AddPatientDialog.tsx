import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddPatientForm from './AddPatientForm';
import addPatientDialogStyle from './AddPatientDialogStyle';

export interface DetailDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

function AddPatientDialog(props: DetailDialogProps) {
  const classes = addPatientDialogStyle()
  const { onClose, open } = props;

  const handleClose = () => {
    onClose("Close dialog");
  };

  return (
    <Dialog 
      onClose={handleClose}
      aria-labelledby="add-patient-dialog" 
      open={open} 
      maxWidth="sm" 
      fullWidth={true}>
      <DialogTitle disableTypography id="simple-dialog-title" className={classes.dialogTitle}>
        <PersonIcon className={classes.dialogTitleIcon}/>
        <h2>Data pasien</h2>
      </DialogTitle>
      <AddPatientForm />
    </Dialog>
  );
}

export default AddPatientDialog;