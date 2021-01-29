import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import PaymentForm from './PaymentForm';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import classes from './App.module.css';import { Button } from '@material-ui/core';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const baseUrl = 'https://localhost:5001/';

  useEffect(() => {
    fetch("https://localhost:5001/payments")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setPayments(res);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
        .withUrl(`${baseUrl}hubs/payments`)
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(result => {
            console.log('Connected!');

            connection.on('UpdatePayments', payments => {            
              setPayments(payments);
            });
        })
        .catch(e => console.log('Connection failed: ', e));
  },[]);

  const onSubmit = (payment) => {
    const body = JSON.stringify(payment);
    fetch(`${baseUrl}payments`, {
      method: 'POST',
      body: body,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  return (
    <div className={classes.App}>
      <div className={classes.ButtonContainer}>
        <Button 
          variant="contained"
          color="secondary"
          onClick={() => setModalOpen(true)}>Create Payment</Button>
      </div>
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>$ {row.amount.toFixed(2)}</TableCell>
                <TableCell>{row.merchant}</TableCell>
                <TableCell>
                  <Chip 
                    variant={row.status === 'Pending' ? 'outlined' : 'default'}
                    color={row.status === 'Failed' ? 'secondary' : row.status === 'Pending' ? 'default' : 'primary'}
                    label={row.status}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaymentForm 
        open={modalOpen} 
        onSubmit={onSubmit}
        handleClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
