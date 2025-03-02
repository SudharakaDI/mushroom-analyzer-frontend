import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {addNewExpense, addNewOperationalExpense, fetchPotStocksMinimal} from "../services/apiService.js";
import toast from "react-hot-toast";


export default function ExpenseDialog({open, onClose}) {
    const expenseTypes = ['OPERATIONAL', 'CAPITAL']
    const [selectedDate, setSelectedDate] = useState(null);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(null);
    const [potStocks, setPotStocks] = useState([]);
    const [selectedPotStock, setSelectedPotStock] = useState(null);
    const [selectedExpenseType, setSelectedExpenseType] = useState('OPERATIONAL');


    useEffect(() => {
        const loadPotStocks = async () => {
            try {
                const potStocks = await fetchPotStocksMinimal();
                setPotStocks((prev) => {
                    if (potStocks.length > 0) {
                        setSelectedPotStock(potStocks[0].id);
                    }
                    return potStocks;
                });
            } catch (err) {
                console.log(err);
            }
        };
        loadPotStocks();

    },[]);



    async function addExpense(expense) {
        try {
            const response = await addNewExpense(selectedPotStock, expense);
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
                            expenseType: selectedExpenseType
                        };
                        addExpense(expenseDetails);
                        onClose();
                    },
                }}
            >
                <DialogTitle>Add Expense</DialogTitle>
                <DialogContent>
                    <select
                        value={selectedPotStock || ""}
                        onChange={(e) => setSelectedPotStock(e.target.value)}
                        style={{
                            padding: '5px',
                            flex: 1,
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    >
                        <option value="" disabled>
                            Select Pot Stock
                        </option>
                        {potStocks.map((potStock) => (
                            <option key={potStock.id} value={potStock.id}>
                                {potStock.description}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedExpenseType}
                        onChange={(e) => setSelectedExpenseType(e.target.value)}
                        style={{
                            padding: '5px',
                            flex: 1,
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    >
                        <option value="" disabled>
                            Select Expense Type
                        </option>
                        {expenseTypes.map((expenseType) => (
                            <option key={expenseType} value={expenseType}>
                                {expenseType}
                            </option>
                        ))}
                    </select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={selectedDate} label="Basic date picker"
                                        onChange={(date) => setSelectedDate(date)}/>
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
