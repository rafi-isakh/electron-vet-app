import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EditPatientForm from './EditPatientForm';
import addPatientDialogStyle from './AddPatientDialogStyle';

export interface EditDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  dialogState: any;
  editPatient: any;
  currentData: any;
  activeProfile: string;
}

function EditPatientDialog(props: EditDialogProps) {
  const classes = addPatientDialogStyle()
  const { onClose, open, dialogState, editPatient, currentData, activeProfile } = props;

  const handleClose = () => {
    onClose("Close dialog");
  };

  return (
    <Dialog 
      onClose={handleClose}
      aria-labelledby="edit-patient-dialog" 
      open={open} 
      maxWidth="sm" 
      fullWidth={true}
      disableBackdropClick>
      <DialogTitle disableTypography id="edit-dialog-title" className={classes.dialogTitle}>
        <PersonIcon className={classes.dialogTitleIcon}/>
        <h2>Data pasien</h2>
      </DialogTitle>
      <EditPatientForm 
        editDialogState={dialogState} 
        editPatient={editPatient}
        activeProfile={activeProfile} 
        currentData={currentData}/>
    </Dialog>
  );
}

export default EditPatientDialog;