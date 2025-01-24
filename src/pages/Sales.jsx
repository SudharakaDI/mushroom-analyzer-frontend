import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Sales.css';
import {useEffect, useState} from "react";
import {fetchSales} from "../services/apiService.js";


function Sales() {

    const [sales, setSales] = useState([]);

    useEffect( () => {
        const loadSales = async () => {
            try {
                const salesData = await fetchSales();
                setSales(salesData);
            } catch (err) {
                console.log(err);
            }
        };
        loadSales();
    },[]);

    return (
        <div className="sales">
            <h1>Sales</h1>
            <TableContainer component={Paper} className="sales-table">
                <Table sx={{ minWidth:200 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Seller</TableCell>
                            <TableCell align="right">Number of items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow
                                key={sale.id}
                            >
                                <TableCell component="th" scope="row">
                                    {sale.date}
                                </TableCell>
                                <TableCell >{sale.seller.name}</TableCell>
                                <TableCell align="right">{sale.numberOfItems}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

export default Sales;