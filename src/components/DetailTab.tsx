import React from 'react';
import detailTabStyle from './DetailTabStyle';
import { Paper, Tabs, Tab, TableRow, TableContainer, Table, TableHead, TableCell, TableBody } from '@material-ui/core';
import DetailTabPanel from './DetailTabPanel';

type detailTabProps = {
  pets: Array<any>
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DetailTab(props: detailTabProps) {
  const classes = detailTabStyle();
  const [value, setValue] = React.useState(0);
  const { pets } = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Data peliharaan" {...a11yProps(0)} />
        </Tabs>
      </Paper>
      <DetailTabPanel value={value} index={1}>
        Alamat
      </DetailTabPanel>
      <DetailTabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nama Hewan</TableCell>
                <TableCell align="left">Jenis Hewan</TableCell>
                <TableCell align="left">Ras&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pets.map(pet => (
                <TableRow key={pet.name}>
                  <TableCell component="th" scope="row">
                  {pet.name}
                  </TableCell>
                  <TableCell align="left">{pet.type}</TableCell>
                  <TableCell align="left">{pet.breed}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DetailTabPanel>
    </div>
  );
}