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

// import Pets from './Pets';

type Props = {
  drawer: boolean;
  activeProfile: string;
  dialogState: any;
  setActiveProfile: (value: string) => void;
  setAddDialogState: () => void;
};

function createData(name: string, address: string, phone: string) {
  return { name, address, phone };
}

function createPetData(name: string, type: string, breed: string) {
  return { name, type, breed }
}

const rows = [
  createData('Irsyad Haniif', 'Jl. Permata Taman Sari Asri III no. 9', '081394708545'),
  createData('Oskar Dion isakh', 'Jl. Gumuruh Belakang no. 55', '0818618061')
];

const pets = [
  createPetData ('Cici', 'Kucing', 'Angora'),
  createPetData ('Kimi', 'Kucing', 'Persia')
]

export default function Patient(props: Props) {
  const classes = patientPageStyle();
  const { drawer, activeProfile, dialogState, setActiveProfile, setAddDialogState } = props;
  const [open, setOpen] = React.useState(false);

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

  const closeAddDialog = () => {
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
        dialogState={setAddDialogState}/>
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
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="right">
                <Tooltip title="Show">
                  <IconButton aria-label="show" value={row.name} onClick={e => handleOpen(e.currentTarget.value)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <DetailDialog open={open} onClose={handleClose} activeProfile={activeProfile} pets={pets}/>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
