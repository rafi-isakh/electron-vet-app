import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import serviceFormStyle from './AddServiceFormStyle';
import { TextField, Button } from '@material-ui/core';

export interface EditDialogProps {
  editDialogState: any;
  editService: any;
  currentData: any;
  activeProfile: any;
}

export default function EditServiceForm(props: EditDialogProps) {
  const classes = serviceFormStyle();
  const { editDialogState, editService, currentData, activeProfile } = props
  const service = currentData[activeProfile.selectedProfile]
  const initialValues = {
    name: service.name,
    category: service.category,
    price: service.price
  }
  const [values, setValues] = useState(initialValues || {});

  const handleSaveButton = () => {
    editService(values, activeProfile);
    editDialogState();
  }

  const handleCancelButton = () => {
    editDialogState();
  }

  const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { name, value } = target;
    event.persist();
    setValues({...values, [name]: value})
  }

  return(
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="name" 
          label="Nama produk / layanan" 
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
          label="Harge" 
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