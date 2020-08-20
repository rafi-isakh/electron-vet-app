import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import serviceFormStyle from './AddServiceFormStyle';
import { TextField, Button } from '@material-ui/core';

export interface AddServiceProps {
  addDialogState: any;
  addService: any
}

export default function AddServiceForm(props: AddServiceProps) {

  const classes = serviceFormStyle();
  const { addDialogState, addService } = props;
  const initialValues = {
    name: "",
    category: "",
    price: ""
  };
  const [values, setValues] = useState(initialValues || {})

  const handleSaveButton = () => {
    addService(values)
    addDialogState();
  }

  const handleCancelButton = () => {
    addDialogState();
  }

  const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { name, value } = target;
    event.persist();
    setValues({...values, [name]: value})
    console.log('Form ', values)
  }

  return(
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="name" 
          label="Nama Barang / Layanan" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange} 
          name="name" 
          value={values.name} />
        <TextField 
          id="category" 
          label="Kategori" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange}  
          name="category" 
          value={values.category} />
        <TextField 
          id="price" 
          label="Harga" 
          variant="outlined" 
          margin="dense"
          onChange={handleChange}  
          name="price" 
          value={values.price} />
      </form>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={handleSaveButton}
          startIcon={<SaveIcon color="primary"/>}
        >
          Simpan
        </Button>
        <Button
          variant="contained"
          color="default"
          size="small"
          startIcon={<CancelIcon color="error" />}
          onClick={handleCancelButton}
          className={classes.buttonItem}
        >
          Batal
        </Button>
      </div>
    </div>
  )
}