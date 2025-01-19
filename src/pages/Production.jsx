import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Production.css';
import {useEffect, useState} from "react";
import axios from "axios";
import ExpandableProductionTable from "../components/ExpandableProductionTable.jsx";

const baseURL = "http://localhost:8080/mushroom-analyzer/backend/api/v1/production";

function Production() {

    const [production, setProduction] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setProduction(response.data);
        })
    },[]);

    return (
        <div className="production">
            <h1>Productions</h1>
            <ExpandableProductionTable/>
        </div>

    )
}

export default Production;