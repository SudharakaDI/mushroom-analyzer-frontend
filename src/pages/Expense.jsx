import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Expense.css';
import {useEffect, useState} from "react";
import {fetchExpenses} from "../services/apiService.js";
import Button from "@mui/material/Button";
import * as React from "react";
import ExpenseDialog from "../components/ExpenseDialog.jsx";


function Expense() {

    const [expenses, setExpenses] = useState([]);
    const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);

    useEffect( () => {
        const loadExpense = async () => {
            try {
                const expenseData = await fetchExpenses();
                setExpenses(expenseData);
            } catch (err) {
                console.log(err);
            }
        };
        loadExpense();
    },[]);

    const handleExpenseDialogOpen = () => {
        setExpenseDialogOpen(true);
    };

    const handleExpenseDialogClose = () => {
        setExpenseDialogOpen(false);
    };


    return (
        <div className="expense">
            <h1>Expense</h1>
            <Button variant="contained" onClick={() => handleExpenseDialogOpen()}>Add Expense</Button>
            <TableContainer component={Paper} className="expense-table">
                <Table sx={{ minWidth:200 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Expense Type</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense) => (
                            <TableRow
                                key={expense.id}
                            >
                                <TableCell component="th" scope="row">
                                    {expense.date}
                                </TableCell>
                                <TableCell >{expense.description}</TableCell>
                                <TableCell >{expense.type}</TableCell>
                                <TableCell align="right">{expense.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ExpenseDialog open={expenseDialogOpen} onClose={handleExpenseDialogClose}/>
        </div>

    )
}

export default Expense;