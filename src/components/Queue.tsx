import React from 'react';
import _ from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import queueStyle from './QueueStyle';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

type Props = {
  drawer: boolean;
  queueList: any;
};

function createData(name: string, owner: string, category: string, status: string) {
  return { name, owner, category, status };
}

const rows = [
  createData('Mika', 'Sulasiyana Rafdiani', 'Pemeriksaan', 'Waiting'),
  createData('Abu', 'Rafi Ramadhan', 'Grooming', 'Processing'),
  createData('Cici', 'Rafi Ramadhan', 'Grooming', 'Billing'),
  createData('Tamtam', 'Rafi Ramadhan', 'Grooming', 'Finished'),
];

export default function Queue(props: Props) {
  const classes = queueStyle();
  const { drawer, queueList } = props;

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
