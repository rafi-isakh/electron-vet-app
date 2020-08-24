import React, { useState } from "react";
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CssBaseline, Button, TextField, MenuItem, Paper, Typography, SnackbarOrigin, Snackbar } from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import AddIcon from '@material-ui/icons/Add';
import medicalRecordStyle from "./MedicalRecordStyle"
import AddRecordDialog from "./AddRecordDialog";
import Alert from "@material-ui/lab/Alert";

type MedRecProps = {
  activeProfile: any;
  auth: any;
  patients: any;
  medicalRecord: any;
  drawer: boolean;
  dialogState: any;
  addRecord: (data: any) => void;
  setAddDialogState: () => void;
  getMedicalRecord: (data: any) => void;
  createMedicalRecord: (data: any) => void;
}

function formatDate(date: Date): string {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
}

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function MedicalRecord(props: MedRecProps) {
  const classes = medicalRecordStyle();
  const { activeProfile, drawer, patients, medicalRecord, dialogState,
    addRecord, getMedicalRecord, createMedicalRecord, setAddDialogState } = props;

  const initialValues = {
    owner: "",
    name: ""
  };
  const [values, setValues] = useState(initialValues || {});
  const [pets, setPets] = useState({})

  const [warning, setWarning] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = warning;

  const handleClose = () => {
    setWarning({ ...warning, open: false });
  };

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

  const handleSearch = (event: any) => {
    getMedicalRecord(values)
    setValues(initialValues)
    event.preventDefault();
  }

  const handleAddRecord = () => {
    if((values.owner === "") || (values.name === "")) {
      if (_.isEmpty(activeProfile)) {
        setWarning({ ...warning, open: true });
      }
      const payload = {
        owner: activeProfile.activeProfile,
        pet: activeProfile.selectedProfile
      }
      createMedicalRecord(payload)
    }
    else {
      createMedicalRecord(values)
    }
  }

  const openAddDialog = () => {
    setAddDialogState()
  }

  const closeAddDialog = () => {
  }

  const recordInfo = (
    <div>
      <Typography variant="body1" gutterBottom>
        Nama hewan: {medicalRecord.pet}
      </Typography> 
      <Typography variant="subtitle2" gutterBottom>
        Pemilik: {medicalRecord.owner}
      </Typography><br />
    </div>
  )

  let recordContent
  if(!_.isEmpty(medicalRecord)) {
    recordContent = (<div>
      <div>
      <AddRecordDialog 
         open={dialogState.addPatientDialog} 
         onClose={closeAddDialog} 
         dialogState={setAddDialogState}
         patient={medicalRecord}
         addRecord={addRecord}/>
      {recordInfo}  
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Keluhan</TableCell>
              <TableCell align="left">Diagnosa</TableCell>
              <TableCell align="left">Tanggal Pemeriksaan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {_.values(medicalRecord.records).map((record: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell align="left">{record.keluhan}</TableCell>
              <TableCell align="left">{record.diagnosa}</TableCell>
              <TableCell align="left">{formatDate(record.checkDate)}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="default"
          size="small"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
        >
          Tambah data
        </Button>
      </div>
    </div>)
  }
  else {
    recordContent = (
    <div>
      <Typography variant="body1" gutterBottom>
        Belum ada catatan rekam medis
      </Typography>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}>
          <Alert onClose={handleClose} severity="warning">Nama pemilik atau hewan kosong</Alert>
      </Snackbar>
      <div className={classes.button2}>
        <Button
        variant="contained"
        color="default"
        size="small"
        startIcon={<AddIcon />}
        onClick={handleAddRecord}
        >
          Buat Rekam Medis
        </Button>  
      </div>
    </div>)
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
            onClick={handleSearch}
          >
           Cari
        </Button>
      </div>
      {recordContent}
    </div>
  )
}