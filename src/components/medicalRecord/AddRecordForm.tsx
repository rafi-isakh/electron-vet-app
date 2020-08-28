import React, { useState } from "react";
import _ from 'lodash'
import { useTheme } from '@material-ui/core/styles';
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

function getStyles(name: string, personName: any, theme: any) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddRecordForm(props: AddRecordProps) {
  const classes = recordFormStyle();
  const theme = useTheme();
  const { addDialogState, addRecord, patient, serviceList } = props
  const initialValues = {
    keluhan: "",
    diagnosa: "",
  }
  const [values, setValues] = useState(initialValues || {})
  const [personName, setPersonName] = React.useState([]);
  
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
    setPersonName(event.target.value);
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

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
          value={personName}
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
          {Object.entries(serviceList).map(([key, itemList]) => (
            serviceList[key].map((name: string) => (
              <div>
                <ListSubheader>{key}</ListSubheader>
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
            </div>)
          )))}
          {/* {names.map((name: string) => (
            <div>
              <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                {name}
              </MenuItem>
            </div>
          ))} */}
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