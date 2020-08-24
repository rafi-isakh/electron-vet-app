import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import queueStyle from './QueueStyle';
import AddQueueDialog from './AddQueueDialog';
import routes from '../../constants/routes.json';

type Props = {
  drawer: boolean;
  dialogState: any;
  queueList: any;
  patients: any;
  setAddDialogState: () => void;
  addQueue: (item: any) => void;
  getMedicalRecord: (values: any) => void
};

export default function Queue(props: Props) {
  const classes = queueStyle();
  const history = useHistory();
  const { 
    drawer, queueList, dialogState, patients, 
    setAddDialogState, addQueue, getMedicalRecord } = props;

  const openAddDialog = () => {
    setAddDialogState()
  }

  const closeAddDialog = () => {
  }

  const handleCheck = (event: any) => {
    const target = event.currentTarget;
    const { name, value } = target;
    const payload = {owner: name, name: value}
    getMedicalRecord(payload);
    history.push(routes.MEDREC)
  }

  let tableContents
  if (queueList !== undefined && !_.isEmpty(queueList)) {
    tableContents = (<TableBody>
      {_.values(queueList.queue).map((item) => (
        <TableRow key={item.name}>
          <TableCell component="th" scope="row">{item.name}</TableCell>
          <TableCell align="left">{item.owner}</TableCell>
          <TableCell align="left">{item.treatment}</TableCell>
          <TableCell align="left">{item.status}</TableCell>
          <TableCell align="left">
          {item.treatment === 'Pemeriksaan' ?
            <Tooltip title="Periksa">
              <IconButton aria-label="edit" value={item.name} name={item.owner} onClick={handleCheck}>
                <CheckBoxIcon />
              </IconButton>
            </Tooltip>
            : null
          }
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
