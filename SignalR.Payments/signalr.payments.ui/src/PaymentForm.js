import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import classes from './PaymentForm.module.css';

const PaymentForm = (props) => {
  const [merchant, setMerchant] = useState(null);
  const [amount, setAmount] = useState(null);

  const onSubmit = (e) => {
    if (isNullOrEmpty(merchant) || isNullOrEmpty(amount)) {
      alert('Merchant and Amount need to be set.');
      return;
    }
    props.onSubmit({
      merchant: merchant,
      amount: amount,
    });

    setMerchant(null);
    setAmount(null);

    props.handleClose();
  } 

  const isNullOrEmpty = (string) => string === null || string === '' || string === undefined;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}>
      <Fade in={props.open}>
        <Card >
          <CardContent className={classes.cardContent}>
            <TextField
              id="merchant-name"
              label="Merchant"
              className={classes.textField}
              value={merchant}
              onChange={e => setMerchant(e.target.value)}
            />
            <TextField
              id="payment-amount"
              label="Amount"
              className={classes.textField}
              value={amount}
              type="number"
              onChange={e => setAmount(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button 
              variant="contained"
              color="primary"
              onClick={onSubmit}>Submit</Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  )
}

export default PaymentForm;