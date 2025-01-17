import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Production.css';

function createData(date,numberOfItems) {
    return {date,numberOfItems};
}

const rows = [
    createData('2025.01.01', 50),
    createData('2025.01.01', 50),
    createData('2025.01.01', 50),
    createData('2025.01.01', 50),
    createData('2025.01.01', 50),
    createData('2025.01.01', 50),

];

function Production() {
    return (
        <div className="production">
            <h1>Productions</h1>
            <TableContainer component={Paper} className="production-table">
                <Table sx={{ minWidth:200 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Number of items</TableCell>
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
                                <TableCell align="right">{row.numberOfItems}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

export default Production;