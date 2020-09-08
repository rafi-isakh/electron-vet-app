import React, { useState } from 'react';
import _ from 'lodash';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import billingFormStyle from './AddBillingFormStyle';
import { TextField, Button, makeStyles, IconButton } from '@material-ui/core';
import activeProfile from '../../reducers/activeProfile';

export interface AddBillingProps {
  editDialogState: any
  billing: any
  activeProfile: any
}

function sumPrice(values: any): number {
  let totalPrice = values.reduce((accumulator: any, currentValue: any) => {
    if (currentValue.price !== '' && currentValue.amount !== '') {
      return accumulator + (parseInt(currentValue.amount) * parseInt(currentValue.price));
    }
    else {
      return accumulator + 0;
    }
  }, 0)

  return totalPrice;
}

export default function AddBillingForm(props: AddBillingProps) {
  const classes = billingFormStyle();
  const { editDialogState, billing, activeProfile } = props;

  const initialValues: any[] = []
  let totalPrice: number = 0

  if(billing !== undefined && !_.isEmpty(billing)) {
    const selected = billing[activeProfile.queueId]
    selected.items.map((item: any) => {
      const value = {
        item: item.name,
        amount: 1,
        price: item.price
      }
      initialValues.push(value)
    })
    totalPrice = selected.totalPrice;
  }

  const [fields, setFields] = useState(initialValues);
  const [total, setTotal] = useState(totalPrice);
  const handleChangeInput = (i: number, event: any) => {
    const values = [...fields];
    const { name, value } = event.target;
    values[i][name] = value
    setFields(values)
    
    if (name !== 'item') {
      setTotal(sumPrice(values))
    }
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
      <TextField 
        id="total"
        className={classes.text} 
        label="Total harga"
        variant="outlined"
        name="total"
        value={total} />
      </form>
    </div>
  )
}