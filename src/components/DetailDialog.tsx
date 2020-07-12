import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { Dialog, DialogTitle } from '@material-ui/core';
import detailDialogStyle from './DetailDialogStyle';
import DetailTab from './DetailTab';


export interface DetailDialogProps {
  open: boolean;
  activeProfile: string;
  onClose: (value: string) => void;
  patientData: any;
  action: any;
  refreshAction: any;
}

function DetailDialog(props: DetailDialogProps) {
  const classes = detailDialogStyle()
  const { activeProfile, onClose, open, patientData, action, refreshAction } = props;
  console.log('Data ', activeProfile)
  console.log('Data activeProfile', typeof activeProfile)
  const handleClose = () => {
    onClose("Close dialog");
  };

  let dialogTitle, patientDetail
  if(patientData[activeProfile] !== undefined) {
    dialogTitle = (
    <DialogTitle disableTypography id="simple-dialog-title" className={classes.dialogTitle}>
      <PersonIcon className={classes.dialogTitleIcon}/>
      <h2>{patientData[activeProfile].name}</h2>
    </DialogTitle>)
    patientDetail = <DetailTab 
      patientData={patientData[activeProfile]} 
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