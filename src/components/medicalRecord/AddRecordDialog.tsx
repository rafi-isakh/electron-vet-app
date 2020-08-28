import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListAltIcon from '@material-ui/icons/ListAlt';
import addRecordDialogStyle from "./AddRecordDialogStyle";
import AddRecordForm from "./AddRecordForm";

export interface AddRecordDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  dialogState: any;
  addRecord: any;
  patient: any;
  serviceList: any;
}

function AddRecordDialog(props: AddRecordDialogProps) {
  const classes = addRecordDialogStyle();
  const { onClose, open, dialogState, patient, addRecord, serviceList } = props;

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
        <ListAltIcon className={classes.dialogTitleIcon}/>
        <h2>Data rekam medis</h2>
      </DialogTitle>
      <AddRecordForm addDialogState={dialogState} addRecord={addRecord} patient={patient} serviceList={serviceList}/>
    </Dialog>
  );
  
}

export default AddRecordDialog;