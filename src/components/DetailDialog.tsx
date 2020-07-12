import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { Dialog, DialogTitle } from '@material-ui/core';
import detailDialogStyle from './DetailDialogStyle';
import DetailTab from './DetailTab';


export interface DetailDialogProps {
  open: boolean;
  activeProfile: any;
  onClose: (value: string) => void;
  patientData: any;
  action: any;
  refreshAction: any;
}

function DetailDialog(props: DetailDialogProps) {
  const classes = detailDialogStyle()
  const { activeProfile, onClose, open, patientData, action, refreshAction } = props;
  const handleClose = () => {
    onClose("Close dialog");
  };
  const patient = patientData[activeProfile.activeProfile]
  let dialogTitle, patientDetail
  if(patient !== undefined) {
    dialogTitle = (
    <DialogTitle disableTypography id="simple-dialog-title" className={classes.dialogTitle}>
      <PersonIcon className={classes.dialogTitleIcon}/>
      <h2>{patient.name}</h2>
    </DialogTitle>)
    patientDetail = <DetailTab 
      patientData={patient} 
      action={action}
      refreshAction={refreshAction} 
      activeProfile={activeProfile}/>
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="lg" fullWidth={true}>
      {dialogTitle}
      {patientDetail}
    </Dialog>
  );
}

export default DetailDialog;