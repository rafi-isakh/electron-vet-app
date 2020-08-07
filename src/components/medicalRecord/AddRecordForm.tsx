import React, { useState } from "react";
import _ from 'lodash'
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import recordFormStyle from "./AddRecordFormStyle";
import TextField from "@material-ui/core/TextField";

export interface AddRecordProps {
  addDialogState: any;
  addRecord: any;
  patient: any;
}

export default function AddRecordForm(props: AddRecordProps) {
  const classes = recordFormStyle();
  const { addDialogState, addRecord, patient } = props
  const initialValues = {
    keluhan: "",
    diagnosa: "",
  }
  const [values, setValues] = useState(initialValues || {})
  
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