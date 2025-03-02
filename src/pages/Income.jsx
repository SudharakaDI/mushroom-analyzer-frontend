import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Income.css';
import {useEffect, useState} from "react";
import {fetchIncomes,} from "../services/apiService.js";
import IncomeDialog from "../components/IncomeDialog.jsx";
import * as React from "react";
import Button from "@mui/material/Button";

function Income() {
    
    const [income, setIncome] = useState([]);
    const [selectedPotStockId, setSelectedPotStockId] = useState(null);
    const [incomedialogOpen, setIncomedialogOpen] = useState(false);



    useEffect( () => {
        const loadIncome = async () => {
            try {
                const incomeData = await fetchIncomes();
                setIncome(incomeData);
            } catch (err) {
                console.log(err);
            }
        };
        loadIncome();
    },[]);

    const handleIncomeDialogOpen = () => {
        setIncomedialogOpen(true);
    };

    const handleIncomeDialogClose = () => {
        setIncomedialogOpen(false);
    };

    return (
        <div className="income">
            <h1>Income</h1>
            <Button variant="contained" onClick={() => handleIncomeDialogOpen()}>Add Income</Button>
            <TableContainer component={Paper} className="income-table">
                <Table sx={{ minWidth:200 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Number of items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {income.map((row) => (
                            <TableRow
                                key={row.date}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <IncomeDialog open={incomedialogOpen} onClose={handleIncomeDialogClose}/>
        </div>

    )
}

export default Income;