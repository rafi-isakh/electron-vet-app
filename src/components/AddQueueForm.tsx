import React, { useState } from "react";
import _ from 'lodash';
import { TextField, Button,  MenuItem } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import queueFormStyle from "./AddQueueFormStyle";

export interface AddDialogProps {
  addDialogState: any;
  addQueue: any;
  patients: any;
}

export default function AddQueueForm(props: AddDialogProps) {

  const classes =  queueFormStyle();
  const { addDialogState, addQueue, patients } = props
  const initialValues = {
    owner: "",
    name: "",
    treatment: ""
  };
  const [values, setValues] = useState(initialValues || {});
  const [pets, setPets] = useState({})

  const handleSaveButton = () => {
    addQueue(values)
    addDialogState();
  }

  const handleCancelButton = () => {
    addDialogState();
  }

  const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    event.persist();
    setValues({...values, [name]: value})
  }

  const handleAutoComplete = (event: any, newValue: any) => {
    console.log('Owner value ', newValue)
    setValues({...values, 'owner': newValue.name})
    setPets(newValue.pets)
  }
  console.log('Form data', values)
  const options = _.values(patients.patients)
  return(
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <Autocomplete
          id="owner"
          onChange={handleAutoComplete}
          options={options}
          getOptionLabel={(option: any) => option.name}
          renderInput={(params) => <TextField {...params} label="Pemilik" variant="outlined" margin="dense"/>}
        />
        <TextField 
          id="pet"
          select 
          label="Peliharaan" 
          variant="outlined" 
          margin="dense"
          name="name"
          onChange={handleChange}
          value={values.name}>
          {_.values(pets).map((pet: any) => (
            <MenuItem key={pet.name} value={pet.name}>
              {pet.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField 
          id="name" 
          label="Kategori Antrian" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange} 
          name="treatment" 
          value={values.treatment} />
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