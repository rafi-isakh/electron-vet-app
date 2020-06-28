import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import patientFormStyle from "./AddPatienFormStyle";

export interface AddDialogProps {
  addDialogState: any;
  addPatient: any;
}

export default function AddPatientForm(props: AddDialogProps) {

  const classes =  patientFormStyle();
  const { addDialogState, addPatient } = props
  const initialValues = {
    name: "",
    address: "",
    phone: ""
  };
  const [values, setValues] = useState(initialValues || {});

  const handleSaveButton = () => {
    addPatient(values)
    addDialogState();
  }

  const handleCancelButton = () => {
    addDialogState();
  }

  const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { name, value } = target;
    event.persist();
    setValues({...values, [name]: value})
  }

  return(
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="name" 
          label="Nama Pemilik" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange} 
          name="name" 
          value={values.name} />
        <TextField 
          id="address" 
          label="Alamat" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange}  
          name="address" 
          value={values.address} />
        <TextField 
          id="phone" 
          label="No Telepon" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange}  
          name="phone" 
          value={values.phone} />
      </form>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={handleSaveButton}
          startIcon={<SaveIcon color="primary"/>}
        >
          Simpan
        </Button>
        <Button
          variant="contained"
          color="default"
          size="small"
          startIcon={<CancelIcon color="error" />}
          onClick={handleCancelButton}
          className={classes.buttonItem}
        >
          Batal
        </Button>
      </div>
    </div>
  )
}