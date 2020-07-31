import React from 'react';
import _ from 'lodash';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import queueStyle from './QueueStyle';
import AddQueueDialog from './AddQueueDialog';

type Props = {
  drawer: boolean;
  dialogState: any;
  queueList: any;
  patients: any;
  setAddDialogState: () => void;
  addQueue: (item: any) => void;
};

export default function Queue(props: Props) {
  const classes = queueStyle();
  const { 
    drawer, queueList, dialogState, patients, 
    setAddDialogState, addQueue } = props;

  const openAddDialog = () => {
    setAddDialogState()
  }

  const closeAddDialog = () => {
  }

  let tableContents
  if (queueList !== undefined && !_.isEmpty(queueList)) {
    tableContents = (<TableBody>
      {_.values(queueList.queue).map((item) => (
        <TableRow key={item.name}>
          <TableCell component="th" scope="row">
            {item.name}
          </TableCell>
          <TableCell align="left">{item.owner}</TableCell>
          <TableCell align="left">{item.treatment}</TableCell>
          <TableCell align="left">{item.status}</TableCell>
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
          </TableRow>
        </TableHead>
        {tableContents}
      </Table>
    </TableContainer>
    </div>
  );
}
