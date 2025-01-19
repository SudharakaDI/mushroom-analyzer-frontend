import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Income.css';
import {useEffect, useState} from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/mushroom-analyzer/backend/api/v1/income";


function Income() {
    
    const [income, setIncome] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setIncome(response.data);
        })
    },[]);
    return (
        <div className="income">
            <h1>Income</h1>
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
        </div>

    )
}

export default Income;