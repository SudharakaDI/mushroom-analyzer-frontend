import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Expense.css';
import {useEffect, useState} from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/mushroom-analyzer/backend/api/v1/expense";

function Expense() {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setExpenses(response.data);
        })
    },[]);
    return (
        <div className="expense">
            <h1>Expense</h1>
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
        </div>

    )
}

export default Expense;