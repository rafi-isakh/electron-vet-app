import React, { useState } from "react";
import _ from 'lodash';
import crypto from 'crypto';
import Autocomplete from '@material-ui/lab/Autocomplete';
import medicalRecordStyle from "./MedicalRecordStyle"
import { CssBaseline, Button, TextField, MenuItem } from "@material-ui/core";

type MedRecProps = {
  auth: any;
  patients: any;
  drawer: boolean;
}

export default function MedicalRecord(props: MedRecProps) {
  const classes = medicalRecordStyle();
  const { drawer, patients } = props;

  const initialValues = {
    owner: "",
    name: ""
  };
  const [values, setValues] = useState(initialValues || {});
  const [pets, setPets] = useState({})

  const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    event.persist();
    setValues({...values, [name]: value})
  }

  const handleAutoComplete = (event: any, newValue: any) => {
    let name = '';
    let pet = '';
    if (newValue) {
      name = newValue.name
      pet = newValue.pets
    }
    setValues({...values, 'owner': name})
    setPets(pet)
  }

  const options = _.values(patients.patients)
  return(
    <div className={drawer ? classes.shiftRight : classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
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
            label="Nama Peliharaan" 
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
        </form>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            // onClick={handleSearch}
            // className={classes.submit}
          >
           Cari
        </Button>
      </div>
    </div>
  )
}