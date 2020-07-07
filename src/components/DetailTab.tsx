import React, { useState } from 'react';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import detailTabStyle from './DetailTabStyle';
import { Paper, Tabs, Tab, TableRow, TableContainer, Table, TableHead, TableCell, TableBody, TextField, Snackbar, SnackbarOrigin } from '@material-ui/core';
import DetailTabPanel from './DetailTabPanel';

type detailTabProps = {
  patientData: any
  action: any
  activeProfile: string
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function DetailTab(props: detailTabProps) {
  const classes = detailTabStyle();
  const [value, setValue] = React.useState(0);
  const { patientData, action, activeProfile } = props;

  const [warning, setWarning] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = warning;
  
  const handleClose = () => {
    setWarning({ ...warning, open: false });
  };

  const initialValues = {
    name: "",
    pet: "",
    breed: ""
  };
  const [pet, setPet] = useState(initialValues || {});

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleForm =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { name, value } = target;
    event.persist();
    setPet({...pet, [name]: value})
  }

  const handleSubmit = () => {
    if (pet.name !== '' && pet.pet !== '') {
      const index = (patientData.pets !== undefined && !_.isEmpty(patientData.pets)) ? +_.keys(patientData.pets).pop() + 1 : 0;
      let payload = {
        ...patientData,
        pets: {
          ...patientData.pets,
          [index]: pet
        }
      }
      action(payload, activeProfile)
      setPet(initialValues)
    } else {
      setWarning({ ...warning, open: true });
    } 
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.currentTarget;
    const { value } = target;
    const petArray = _.values(patientData.pets)
    petArray.splice(value, 1)

    let reorderPet = petArray.map((pet, idx) => Object.assign({}, pet))
    let pets = Object.assign({}, reorderPet)
    let payload = {
      ...patientData,
      pets
    }
    action(payload, activeProfile)
  }
  
  let petDisplay
  if (patientData.pets !== undefined) {
    petDisplay = (<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>  
            <TableCell>Nama Hewan</TableCell>
            <TableCell align="left">Jenis Hewan</TableCell>
            <TableCell align="left">Ras&nbsp;</TableCell>
            <TableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {_.values(patientData.pets).map((pet, order) => (
            <TableRow key={pet.name}>
              <TableCell component="th" scope="row">
              {pet.name}
              </TableCell>
              <TableCell align="left">{pet.pet}</TableCell>
              <TableCell align="left">{pet.breed}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="delete pet" value={order} onClick={handleDelete}>
                  <HighlightOffIcon color="secondary"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
  } else {
    petDisplay = <TableContainer />
  }

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
        {petDisplay}
        <div>
          <form className={classes.inputField} noValidate autoComplete="off">
            <TextField className={classes.textInput} name="name" label="Nama" onChange={handleForm} value={pet.name}/>
            <TextField className={classes.textInput} name="pet" label="Jenis hewan" onChange={handleForm} value={pet.pet}/>
            <TextField className={classes.textInput} name="breed" label="Ras" onChange={handleForm} value={pet.breed}/>
            <IconButton color="primary" aria-label="add pet" component="span" onClick={handleSubmit}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </form>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}>
              <Alert onClose={handleClose} severity="warning">Nama dan jenis peliharaan kosong</Alert>
          </Snackbar>
        </div>
      </DetailTabPanel>
    </div>
  );
}