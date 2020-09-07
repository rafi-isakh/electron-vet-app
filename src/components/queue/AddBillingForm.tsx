import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import billingFormStyle from './AddBillingFormStyle';
import { TextField, Button, makeStyles, IconButton } from '@material-ui/core';

export interface AddBillingProps {
  editDialogState: any
}

export default function AddBillingForm(props: AddBillingProps) {
  const classes = billingFormStyle();
  const { editDialogState } = props;

  const initialValues: any[] = [{
    item: '',
    amount: '',
    price: '',
  }]
  const [fields, setFields] = useState(initialValues);

  const handleChangeInput = (i: number, event: any) => {
    const values = [...fields];
    const { name, value } = event.target;
    values[i][name] = value;
    setFields(values)
    console.log('Fields ', fields)
  }

  const handleAddItem = () => {
    const values = [...fields]
    values.push({
      item: '',
      amount: '',
      price: ''
    });
    setFields(values);
  }

  const handleRemoveItem = (i: number) => {
    const values = [...fields]
    values.splice(i, 1);
    setFields(values);
  }

  const fieldSet: any[] = []
  fieldSet.push()

  return(
    <div>
      <form className={classes.root} noValidate autoComplete="off">
      {fields.map((field: any, idx: number) => {
        return (
        <div key={`${field}-${idx}`}>
          <TextField 
            id="item"
            className={classes.text}
            label="Nama Item"
            variant="outlined"
            name="item"
            value={field.item}
            onChange={e => handleChangeInput(idx, e)} />
          <TextField 
            id="amount"
            className={classes.text} 
            label="Jumlah"
            variant="outlined"
            name="amount"
            value={field.amount}
            onChange={e => handleChangeInput(idx, e)} />
          <TextField 
            id="price"
            className={classes.text} 
            label="Harga"
            variant="outlined"
            name="price"
            value={field.price}
            onChange={e => handleChangeInput(idx, e)} />
          <IconButton color="primary" aria-label="add item" component="span" onClick={handleAddItem}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete item" onClick={() => handleRemoveItem(idx)}>
            <HighlightOffIcon color="secondary"/>
          </IconButton>
        </div>
      )})}
      </form>
    </div>
  )
}