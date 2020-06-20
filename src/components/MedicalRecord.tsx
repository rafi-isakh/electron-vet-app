import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import patientPageStyle from './PatientStyle';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
// import Pets from './Pets';

type Props = {
  drawer: boolean;
};

function createData(name: string, address: string, phone: string) {
  return { name, address, phone };
}

const rows = [
  createData('Irsyad Haniif', 'Jl. Permata Taman Sari Asri III no. 9', '081394708545'),
  createData('Oskar Dion isakh', 'Jl. Gumuruh Belakang no. 55', '0818618061')
];

export default function MedicalRecord(props: Props) {
  const classes = patientPageStyle();
  const { drawer } = props;

  return (
    <div className={drawer ? classes.shiftRight : classes.root}>
      <CssBaseline />
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Pasien</TableCell>
            <TableCell align="left">Diagnosis</TableCell>
            <TableCell align="left">No Telepon&nbsp;</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
