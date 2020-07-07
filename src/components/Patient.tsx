import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import patientPageStyle from './PatientStyle';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DetailDialog from './DetailDialog';
import AddPatientDialog from './AddPatientDialog';
import EditPatientDialog from './EditPatientDialog';
import AlertDialog from './AlertDialog';

// import Pets from './Pets';

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

function createPetData(name: string, type: string, breed: string) {
  return { name, type, breed }
}

const pets = [
  createPetData ('Cici', 'Kucing', 'Angora'),
  createPetData ('Kimi', 'Kucing', 'Persia')
]

export default function Patient(props: Props) {
  const classes = patientPageStyle();
  const { 
    drawer, activeProfile, dialogState, patients, currentPatients,
    setActiveProfile, setAddDialogState, setEditDialogState, setDeleteDialogState,
    addPatient, editPatient, deletePatient } = props;
  const [open, setOpen] = React.useState(false);
  const deleteMessage = "Do you want to delete this item ?";
  

  const handleOpen = (name: string) => {
    setOpen(true);
    setActiveProfile(name);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  if(patients !== undefined) {
    tableContents = (<TableBody>
      {patients.map((patient: any) => (
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
              pets={pets}
              action={editPatient} 
              patientData={currentPatients}/>
            <Tooltip title="Edit">
              <IconButton aria-label="edit" value={patient.id} onClick={openEditDialog}>
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
