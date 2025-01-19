import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import Row from './ExpandableProductionTableRow.jsx';
import backendClient from "../services/api.js";

export default function ExpandableProductionTable() {

    const [productions, setProductions] = useState([]);
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        loadProductions();
    },[]);

    useEffect(() => {
        loadSellers();
    },[]);

    const loadProductions = () => {
        backendClient.get('/production').then((response) => {
            setProductions(response.data);
        })
    }

    const loadSellers = () => {
        backendClient.get('/sales/sellers').then((response) => {
            setSellers(response.data);
        });
    }

    return (
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
                    {productions.map((production) => (
                        <Row key={production.id} row={production} sellers={sellers} loadProductions={loadProductions} />
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
}
