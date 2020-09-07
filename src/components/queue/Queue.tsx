import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PaymentIcon from '@material-ui/icons/Payment';
import queueStyle from './QueueStyle';
import AddQueueDialog from './AddQueueDialog';
import routes from '../../constants/routes.json';
import AddBillingDialog from './AddBillingDialog';

type Props = {
  drawer: boolean;
  dialogState: any;
  queueList: any;
  patients: any;
  services: any;
  setAddDialogState: () => void;
  setActiveQueue: (owner: string, pet: string) => void;
  setEditDialogState: () => void;
  addQueue: (item: any) => void;
  getMedicalRecord: (values: any) => void
};

function groupServiceByCategory(services: any): any {
  let serviceGroup: any = {};
  let listedCategories: any[] = [];
  for (let key in services) {
    const category = services[key].category
    const name = services[key].name

    if (!listedCategories.includes(category)) {
      listedCategories.push(category);
      let itemList: any[] = []
      itemList.push(name)
      Object.assign(serviceGroup, {[category]: itemList})
    }
    else {
      let currentList = serviceGroup[category]
      currentList.push(name)
      Object.assign(serviceGroup, {[category]: currentList})
    }
  }
  return serviceGroup
}

export default function Queue(props: Props) {
  const classes = queueStyle();
  const history = useHistory();
  const { 
    drawer, queueList, dialogState, patients, services,
    setActiveQueue, setAddDialogState, setEditDialogState, addQueue, getMedicalRecord } = props;

  const openAddDialog = () => {
    setAddDialogState()
  }

  const closeAddDialog = () => {
  }

  const handleCheck = (event: any) => {
    const target = event.currentTarget;
    const { name, value } = target;
    const payload = {owner: name, name: value}
    setActiveQueue(name, value)
    getMedicalRecord(payload);
    history.push(routes.MEDREC)
  }

  const openBillingDialog = (event: any) => {
    const target = event.currentTarget;
    const { name, value } = target;

    setEditDialogState();
  }

  const serviceList = groupServiceByCategory(services)
  let tableContents
  if (queueList !== undefined && !_.isEmpty(queueList)) {
    tableContents = (<TableBody>
      {_.values(queueList).map((item) => (
        <TableRow key={item.name}>
          <TableCell component="th" scope="row">{item.name}</TableCell>
          <TableCell align="left">{item.owner}</TableCell>
          <TableCell align="left">{item.treatment}</TableCell>
          <TableCell align="left">{item.status}</TableCell>
          <TableCell align="left">
          {item.treatment === 'Pemeriksaan' ?
            <Tooltip title="Periksa">
              <IconButton aria-label="edit" value={item.name} name={item.owner} onClick={handleCheck}>
                <CheckBoxIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
            : null
          }
            <Tooltip title="Bayar">
              <IconButton aria-label="billing" onClick={openBillingDialog}>
                <PaymentIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>)
  }
  else {
    tableContents = <TableBody />
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
          Tambah antrian
        </Button>
      </div>
      <AddQueueDialog 
        open={dialogState.addPatientDialog} 
        onClose={closeAddDialog} 
        dialogState={setAddDialogState}
        patients={patients}
        addQueue={addQueue}
        />
      <AddBillingDialog
        open={dialogState.editPatientDialog}
        onClose={closeAddDialog}
        dialogState={setEditDialogState} />
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Hewan</TableCell>
            <TableCell align="left">Pemilik</TableCell>
            <TableCell align="left">Kategori Antrian</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left" />
          </TableRow>
        </TableHead>
        {tableContents}
      </Table>
    </TableContainer>
    </div>
  );
}
