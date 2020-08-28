import React, { useState } from "react";
import _ from 'lodash'
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import recordFormStyle from "./AddRecordFormStyle";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import ListSubheader from "@material-ui/core/ListSubheader";

export interface AddRecordProps {
  addDialogState: any;
  addRecord: any;
  patient: any;
  serviceList: any;
}

export default function AddRecordForm(props: AddRecordProps) {
  const classes = recordFormStyle();
  const { addDialogState, addRecord, patient, serviceList } = props
  const initialValues = {
    keluhan: "",
    diagnosa: ""
  }
  const [values, setValues] = useState(initialValues || {})
  const [services, setServices] = React.useState([]);
  
  const handleSaveButton = () => {
    const index = (patient.records !== undefined && !_.isEmpty(patient.records)) ? _.keys(patient.records).length + 1 : 0;
    const recordItem = {
      keluhan: values.keluhan,
      diagnosa: values.diagnosa,
      checkDate: Date.now()
    }
    const record = {
      ...patient,
      records: {
        ...patient.records,
        [index]: recordItem
      }
    }
    addRecord(record)
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

  const handleSelect = (event: any) => {
    setServices(event.target.value);
  };

  let options: any[] =[]
  Object.entries(serviceList).map(([key]) => {
    let currentKeyGroup = 0;
    
    serviceList[key].map((name: string) => {
    currentKeyGroup++
    if (currentKeyGroup === 1) {
      options.push(<ListSubheader>{key}</ListSubheader>)
    }
    options.push(<MenuItem key={name} value={name}>{name}</MenuItem>)
  })})

  return(
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          multiline
          rows={3} 
          id="keluhan" 
          label="Keluhan" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange} 
          name="keluhan" 
          value={values.keluhan} />
        <TextField
          multiline
          rows={3} 
          id="diagnosa" 
          label="Diagnosa" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange} 
          name="diagnosa" 
          value={values.diagnosa} />
        <FormControl>
        <InputLabel id="multiple-chip-label">Obat / Tindakan</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          autoWidth
          variant="outlined"
          value={services}
          onChange={handleSelect}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected: any) => (
            <div className={classes.chips}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
        >
          {options.map((optionItem: any) => {
            return optionItem
          })}
        </Select>
        </FormControl>  
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