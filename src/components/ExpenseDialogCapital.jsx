import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {addNewCapitalExpense} from "../services/apiService.js";
import toast from "react-hot-toast";


export default function ExpenseDialogCapital({open, onClose, potStockId}) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(null);


    async function addExpense(expense) {
        try {
            const response = await addNewCapitalExpense(potStockId, expense);
            console.log(response);
            toast.success("Expense Added");

        } catch (err) {
            console.log(err);
        }
    }

    return (

        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null;
                        console.log(formattedDate);
                        const expenseDetails = {
                            date: formattedDate,
                            amount: amount,
                            description: description,
                        };
                        addExpense(expenseDetails);
                        onClose();
                    },
                }}
            >
                <DialogTitle>Add Expense</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={selectedDate} label="Basic date picker" onChange={(date) => setSelectedDate(date)}  />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        required
                        value={amount}
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="text"
                        onChange={(event) => {
                            setAmount(event.target.value);
                        }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        value={description}
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
