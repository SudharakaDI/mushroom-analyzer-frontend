import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import * as React from "react";
import {useState} from "react";
import IncomeDialog from "./IncomeDialog.jsx";
import ExpenseDialog from "./ExpenseDialog.jsx";
import {addNewSale} from "../services/apiService.js";
import SalesDialog from "./SalesDialog.jsx";
import toast from "react-hot-toast";


export default function SalesSubTable({sales, loadProductions, sellers, productionId}) {

    const [selectedSeller, setSelectedSeller] = React.useState(null);
    const [newNumberOfItems, setNewNumberOfItems] = React.useState(null);
    const [selectedSalesId, setSelectedSalesId] = useState(null);
    const [incomedialogOpen, setIncomedialogOpen] = useState(false);
    const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
    const [salesDialogOpen, setSalesDialogOpen] = useState(false);

    const handleSalesDialogOpen = (salesId) => {
        setSelectedSalesId(salesId);
        setSalesDialogOpen(true);
    };


    const handleSalesDialogClose = () => {
        setSalesDialogOpen(false);
    };

    const handleIncomeDialogOpen = (salesId) => {
        setSelectedSalesId(salesId);
        setIncomedialogOpen(true);
    };

    const handleIncomeDialogClose = () => {
        setIncomedialogOpen(false);
    };

    const handleExpenseDialogOpen = (salesId) => {
        setSelectedSalesId(salesId);
        setExpenseDialogOpen(true);
    };

    const handleExpenseDialogClose = () => {
        setExpenseDialogOpen(false);
    };

    async function addSales(sale) {
        try {
            const response = await addNewSale(productionId, sale);
            console.log(response);
            toast.success("Sales Added");
            loadProductions();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
        <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
                Sales
            </Typography>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>Seller</TableCell>
                        <TableCell>No of Items</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sales.map((salesRow) => (
                        <TableRow key={salesRow.id}>
                            <TableCell component="th" scope="row">
                                {salesRow.seller.name}
                            </TableCell>
                            <TableCell>{salesRow.numberOfItems}</TableCell>
                            {/*<TableCell>*/}
                            {/*    <Button variant="contained" onClick={() => handleIncomeDialogOpen(salesRow.id)}>Add Income</Button>*/}
                            {/*    <Button variant="contained" onClick={() => handleExpenseDialogOpen(salesRow.id)}>Add Expense</Button>*/}
                            {/*</TableCell>*/}
                            <TableCell>
                                <Button variant="outlined" startIcon={<DeleteIcon/>}>
                                </Button>
                                <Button variant="contained" endIcon={<EditIcon />} onClick={() => handleSalesDialogOpen(salesRow.id)} >
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box mt={2}>
                <Typography variant="subtitle1">Add New Sale</Typography>
                <Box display="flex" alignItems="center" gap={2} mt={1}>
                    <select
                        value={selectedSeller || ""}
                        onChange={(e) => setSelectedSeller(e.target.value)}
                        style={{
                            padding: '5px',
                            flex: 1,
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    >
                        <option value="" disabled>
                            Select Seller
                        </option>
                        {sellers.map((seller) => (
                            <option key={seller.id} value={seller.id}>
                                {seller.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Number of Items"
                        value={newNumberOfItems}
                        onChange={(e) => setNewNumberOfItems(e.target.value)}
                        style={{padding: '5px', flex: 1}}
                    />
                    <button
                        onClick={() => {
                            const sales = {
                                stakeHolderId: selectedSeller,
                                numberOfItems: newNumberOfItems
                            };
                            addSales(sales);
                        }}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    >
                        Add
                    </button>
                </Box>
            </Box>
        </Box>
        <IncomeDialog open={incomedialogOpen} onClose={handleIncomeDialogClose}  salesId={selectedSalesId}/>
        <ExpenseDialog open={expenseDialogOpen} onClose={handleExpenseDialogClose} salesId={selectedSalesId} />
        <SalesDialog open={salesDialogOpen} onClose={handleSalesDialogClose} salesId={selectedSalesId} sellers={sellers} loadProductions={loadProductions} />
            {/*<SalesDialog open={salesDialogOpen} onClose={handleSalesDialogClose} salesItem={selectedSalesItem} sellers={sellers} loadProductions={loadProductions} />*/}
        </div>

    )
}