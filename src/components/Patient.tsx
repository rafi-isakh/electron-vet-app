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
  drawer: boolean;
  activeProfile: string;
  dialogState: any;
  patients: any;
  currentPatients: any;
  setActiveProfile: (value: string) => void;
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
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [search, setSearch] = React.useState();
  const deleteMessage = "Do you want to delete this item ?";
  

  const handleOpen = (name: string) => {
    setOpen(true);
    setActiveProfile(name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { value } = target;
    event.persist();
    setName(value);
    let test = patients.patients.resultList.filter((patient: any) => {
      const refinedInput = new RegExp(value, 'i');
      return patient.name.match(refinedInput)
    })
    console.log('Search result ', test)
    setSearch(test)
  }

  const openAddDialog = () => {
    setAddDialogState()
  }

  const openEditDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.currentTarget;
    const { value } = target;
    console.log('ID ', value)
    setEditDialogState();
    setActiveProfile(value);
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    const target = event.currentTarget;
    const { value } = target;
    setActiveProfile(value);
    setDeleteDialogState()
  }

  const closeAddDialog = () => {
  }

  let tableContents
  let dataSource
  console.log('Patients ---', patients)
  if(patients === search || name === '') {
    dataSource = patients
  }
  else {
    dataSource = Object.assign({},{'patients': {'resultList': search}});
  }

  console.log("Data source", dataSource)
  if(dataSource !== undefined && !_.isEmpty(dataSource)) {
    tableContents = (<TableBody>
      {dataSource.patients.resultList.map((patient: any) => (
        <TableRow key={patient.name}>
          <TableCell component="th" scope="row">
            {patient.name}
          </TableCell>
          <TableCell align="left">{patient.address}</TableCell>
          <TableCell align="left">{patient.phone}</TableCell>
          <TableCell align="right">
            <Tooltip title="Show">
              <IconButton aria-label="show" value={patient.id} onClick={e => handleOpen(e.currentTarget.value)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <DetailDialog 
              open={open} 
              onClose={handleClose} 
              activeProfile={activeProfile}
              action={editPatient}
              refreshAction={getPatients} 
              patientData={currentPatients.patients.detailInfo}/>
            <Tooltip title="Edit">
              <IconButton aria-label="edit" value={patient.id} onClick={openEditDialog}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <EditPatientDialog 
              open={dialogState.editPatientDialog} 
              onClose={closeAddDialog} 
              dialogState={setEditDialogState}
              currentData={currentPatients.patients.detailInfo}
              activeProfile={activeProfile}
              editPatient={editPatient}/>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" value={patient.id} onClick={handleDelete}>
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
            placeholder="Cari Pasien"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={handleSearch}
            value={name}
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
            <TableCell>Nama Pasien</TableCell>
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
