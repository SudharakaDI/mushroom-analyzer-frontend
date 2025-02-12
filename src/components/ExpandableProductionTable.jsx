import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import Row from './ExpandableProductionTableRow.jsx';
import {
    fetchProductionsFromPotStock,
    fetchSellers
} from "../services/apiService.js";
import {TablePagination} from "@mui/material";

export default function ExpandableProductionTable({potStockId}) {

    const [productions, setProductions] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5


    useEffect(() => {
        loadProductions();
    },[potStockId]);

    useEffect(() => {
        loadSellers();
    },[]);

    // const loadProductions = async () => {
    //     const data = await fetchProductions();
    //     setProductions(data);
    // }
    const loadProductions = async () => {
        try {
            const productions = await fetchProductionsFromPotStock(potStockId);
            setProductions(productions);
        } catch (err) {
            console.log(err);
        }
    }


    const loadSellers = async () => {
        const data = await fetchSellers();
        setSellers(data);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    return (
        <>

        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Date</TableCell>
                        <TableCell >Number of Items</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? productions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : productions
                    ).map((production) => (
                        <Row key={production.id} row={production} sellers={sellers} loadProductions={loadProductions} />
                    ))}
                </TableBody>
            </Table>
``
        </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={productions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}

            />

        </>

    );
}
