import React from 'react';
import _ from 'lodash';
import { CssBaseline, Paper, Tooltip, IconButton } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import serviceStyle from './ServiceStyle';
import AddServiceDialog from './AddServiceDialog';
import EditServiceDialog from './EditServiceDialog';
import AlertDialog from '../patient/AlertDialog';

type ServiceProps = {
  activeProfile: any;
  auth: any;
  drawer: boolean;
  dialogState: any;
  services: any;
  setActiveProfile: (value: string, key: number) => void;
  setAddDialogState: () => void;
  setEditDialogState: () => void;
  setDeleteDialogState: () => void;
  addService: (value: any) => void;
  editService: (value: any, selected: any) => void;
  deleteService: (value: any) => void;
}

function formatPrice(price: number): string {
  const options = { style: 'currency', currency: 'IDR' }
  return new Intl.NumberFormat('id-ID', options).format(price);
}

export default function Service(props: ServiceProps) {
  const classes = serviceStyle();
  const { 
    activeProfile, dialogState, drawer, services, 
    setActiveProfile, setAddDialogState, setEditDialogState, setDeleteDialogState, addService, editService, deleteService } = props;
  const initialSearch: any[] = []

  const [name, setName] = React.useState('');
  const [search, setSearch] = React.useState(initialSearch);
  const deleteMessage = "Do you want to delete this item ?";

  const openAddDialog = () => {
    setAddDialogState()
  }

  const closeAddDialog = () => {
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

  let tableContents
  let dataSource
  if(services === search || name === '') {
    dataSource = services
  }
  else {
    dataSource = Object.assign({}, {'services': search});
  }

  if (dataSource !== undefined && !_.isEmpty(dataSource)) {
    tableContents = (<TableBody>
      {_.values(dataSource).map((service: any, idx: number) => (
        <TableRow key={service.name}>
          <TableCell component="th" scope="row">
            {service.name}
          </TableCell>
          <TableCell align="left">{service.category}</TableCell>
          <TableCell align="left">{formatPrice(service.price)}</TableCell>
          <TableCell align="left">
            <Tooltip title="Edit">
              <IconButton aria-label="edit" value={service.id} name={idx.toString()} onClick={openEditDialog}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <EditServiceDialog
              open={dialogState.editPatientDialog}
              onClose={closeAddDialog}
              dialogState={setEditDialogState}
              currentData={services}
              activeProfile={activeProfile}
              editService={editService}/>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" value={service.id} name={idx.toString()} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <AlertDialog 
              open={dialogState.deletePatientDialog} 
              id={activeProfile} 
              action={deleteService}
              dialogState={setDeleteDialogState}
              title={"Delete Confirmation"}
              message={deleteMessage}/>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>)
  }
  else {
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
          Tambah item
        </Button>
      </div>
      <AddServiceDialog
        open={dialogState.addPatientDialog}
        onClose={closeAddDialog}
        dialogState={setAddDialogState}
        addService={addService}/>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="service table">
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell align="left">Kategori</TableCell>
              <TableCell align="left">Harga</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          {tableContents}
        </Table>
      </TableContainer>
    </div>
  );
}