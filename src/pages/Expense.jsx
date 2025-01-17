import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Expense.css';

function createData(date, description, stakeHolder, amount) {
    return {date, description, stakeHolder, amount};
}

const rows = [
    createData('2025.01.01', 'Selling Fee', 'Saumasiri', 50),
    createData('2025.01.01', 'Selling Fee', 'Saumasiri', 50),
    createData('2025.01.01', 'Selling Fee', 'Saumasiri', 50),
    createData('2025.01.01', 'Selling Fee', 'Saumasiri', 50),

];

function Expense() {
    return (
        <div className="expense">
            <h1>Expense</h1>
            <TableContainer component={Paper} className="expense-table">
                <Table sx={{ minWidth:200 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Stake Holder</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.date}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell >{row.description}</TableCell>
                                <TableCell >{row.stakeHolder}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

export default Expense;