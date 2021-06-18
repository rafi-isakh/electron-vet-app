import React, { useState } from 'react';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import detailTabStyle from './DetailTabStyle';
import { Paper, Tabs, Tab, TableRow, TableContainer, Table, TableHead, TableCell, 
  TableBody, TextField, Snackbar, SnackbarOrigin, Select } from '@material-ui/core';
import DetailTabPanel from './DetailTabPanel';

type detailTabProps = {
  patientData: any
  action: any
  refreshAction: any
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
    breed: "",
    gender: ""
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

  const handleSelectInput = (event: any) => {
    const name = event.target.name;
    event.persist();
    setPet({...pet, [name]: event.target.value});
  };

  const handleSubmit = () => {
    if (pet.name !== '' && pet.pet !== '') {
      const index = (patientData.pets !== undefined && !_.isEmpty(patientData.pets)) ? _.keys(patientData.pets).length + 1 : 0;
      let payload = {
        ...patientData,
        pets: {
          ...patientData.pets,
          [index]: pet
        }
      }
      setPet(initialValues)
      action(payload, activeProfile)
    } else {
      setWarning({ ...warning, open: true });
    } 
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.currentTarget;
    const { value } = target;
    const petArray = _.values(patientData.pets)
    
    const index = parseInt(value)
    petArray.splice(index, 1)

    let reorderPet = petArray.map((pet: any, idx: number) => Object.assign({}, pet))
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
            <TableCell align="left">Gender&nbsp;</TableCell>
            <TableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {_.values(patientData.pets).map((pet: any, order: number) => (
            <TableRow key={pet.name}>
              <TableCell component="th" scope="row">
              {pet.name}
              </TableCell>
              <TableCell align="left">{pet.pet}</TableCell>
              <TableCell align="left">{pet.gender}</TableCell>
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
            <Select
              native
              className={classes.selectInput}
              id="demo-simple-select"
              name="pet"
              value={pet.pet}
              onChange={handleSelectInput}
            >
              <option value="" disabled>Hewan</option>
              <option value={"Kucing"}>Kucing</option>
              <option value={"Anjing"}>Anjing</option>
              <option value={"Lainnya"}>Lainnya</option>
            </Select>
            <Select
              native
              className={classes.selectInput}
              id="demo-simple-select"
              name="gender"
              value={pet.gender}
              onChange={handleSelectInput}
            >
              <option value="" disabled>Gender</option>
              <option value={"Jantan"}>Jantan</option>
              <option value={"Betina"}>Betina</option>
            </Select>
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