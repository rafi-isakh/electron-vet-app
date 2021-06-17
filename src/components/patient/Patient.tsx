import React from 'react';
import _ from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import patientPageStyle from './PatientStyle';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, InputBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DetailDialog from './DetailDialog';
import AddPatientDialog from './AddPatientDialog';
import EditPatientDialog from './EditPatientDialog';
import AlertDialog from './AlertDialog';

type Props = {
  auth: any;
  drawer: boolean;
  activeProfile: string;
  dialogState: any;
  patients: any;
  currentPatients: any;
  setActiveProfile: (value: string, key: number) => void;
  setAddDialogState: () => void;
  setEditDialogState: () => void;
  setDeleteDialogState: () => void;
  addPatient: (value: any) => void;
  editPatient: (value: any, id: string) => void;
  deletePatient: (id: string) => void;
  getPatients: () => void;
};

export default function Patient(props: Props) {
  const classes = patientPageStyle();
  const { 
    drawer, activeProfile, dialogState, patients, currentPatients,
    setActiveProfile, setAddDialogState, setEditDialogState, setDeleteDialogState,
    addPatient, editPatient, deletePatient, getPatients } = props;
  const initialSearch: any[] = []

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [petName, setPetName] = React.useState('');
  const [search, setSearch] = React.useState(initialSearch);
  const deleteMessage = "Do you want to delete this item ?";
  

  const handleOpen = (event: any) => {
    const target = event.currentTarget;
    const { name, value } = target;
    setOpen(true);
    setActiveProfile(value, parseInt(name));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { value } = target;
    event.persist();
    setName(value);
    let test = _.values(patients).filter((patient: any) => {
      const refinedInput = new RegExp(value, 'i');
      return patient.name.match(refinedInput)
    })

    setSearch(test)
  }

  const handlePetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { value } = target;
    event.persist();
    setPetName(value);
    let typedWord = _.values(patients).filter((patient: any) => {
      if (patient.pets !== undefined) {
        let pets = Object.values(patient.pets)
        let petName = pets.map((pet: any) => pet.name.toLowerCase())
        if (petName.includes(value.toLowerCase())) {
          return patient.name;
        }
      }
      return "";
    })
    setSearch(typedWord);
  }

  const openAddDialog = () => {
    setAddDialogState()
  }

  const openEditDialog = (event: any) => {
    const target = event.currentTarget;
    const { name, value } = target;

    setEditDialogState();
    setActiveProfile(value, parseInt(name));
  }

  const handleDelete = (event: any) =>{
    const target = event.currentTarget;
    const { name, value } = target;
    setActiveProfile(value, parseInt(name));
    setDeleteDialogState()
  }

  const closeAddDialog = () => {
  }

  let tableContents
  let dataSource
  let filledSearch = (name === '' && petName !== '') || (name !== '' && petName === '')
  if(patients === search || !filledSearch) {
    dataSource = patients
  }
  else {
    dataSource = Object.assign({}, search);
  }

  if(dataSource !== undefined && !_.isEmpty(dataSource)) {
    tableContents = (<TableBody>
      {_.values(dataSource).map((patient: any, idx: number) => (
        <TableRow key={patient.name}>
          <TableCell component="th" scope="row">
            {patient.name}
          </TableCell>
          <TableCell align="left">{patient.address}</TableCell>
          <TableCell align="left">{patient.phone}</TableCell>
          <TableCell align="right">
            <Tooltip title="Show">
              <IconButton aria-label="show" value={patient.id} name={idx.toString()} onClick={handleOpen}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <DetailDialog 
              open={open} 
              onClose={handleClose} 
              activeProfile={activeProfile}
              action={editPatient}
              refreshAction={getPatients} 
              patientData={currentPatients}/>
            <Tooltip title="Edit">
              <IconButton aria-label="edit" value={patient.id} name={idx.toString()} onClick={openEditDialog}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <EditPatientDialog 
              open={dialogState.editPatientDialog} 
              onClose={closeAddDialog} 
              dialogState={setEditDialogState}
              currentData={currentPatients}
              activeProfile={activeProfile}
              editPatient={editPatient}/>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" value={patient.id} name={idx.toString()} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <AlertDialog 
            open={dialogState.deletePatientDialog} 
            id={activeProfile} 
            action={deletePatient}
            dialogState={setDeleteDialogState}
            title={"Delete Confirmation"}
            message={deleteMessage}/>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>)
  } else {
    tableContents = (<TableBody />)
  }

  return (
    <div className={drawer ? classes.shiftRight : classes.root}>
      <CssBaseline />
      <div className={classes.button}>
        <Paper className={classes.searchBox}>
          <InputBase
            className={classes.input}
            placeholder="Cari Pemilik"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={handleSearch}
            value={name}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Cari Hewan"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={handlePetSearch}
            value={petName}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          variant="contained"
          color="default"
          size="small"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
        >
          Tambah pasien
        </Button>
      </div>
      <AddPatientDialog 
        open={dialogState.addPatientDialog} 
        onClose={closeAddDialog} 
        dialogState={setAddDialogState}
        addPatient={addPatient}/>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Pemilik</TableCell>
            <TableCell align="left">Alamat</TableCell>
            <TableCell align="left">No Telepon&nbsp;</TableCell>
            <TableCell align="left" />
          </TableRow>
        </TableHead>
        {tableContents}
      </Table>
    </TableContainer>
    </div>
  );
}
