import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {editSale} from "../services/apiService.js";
import toast from "react-hot-toast";


export default function SalesDialog({open, onClose, salesId, sellers, loadProductions}) {
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [noOfItems, setNoOfItems] = useState(null);


    async function handleUpdateSales(sales) {
        try {
            const response = await editSale(salesId, sales);
            console.log(response);
            toast.success("Sales Updated");
            loadProductions();

        } catch (err) {
            console.log(err);
        }
    }

    return (

        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const incomeDetails = {
                            numberOfItems: noOfItems,
                            stakeHolderId: selectedSeller,
                        };
                        handleUpdateSales(incomeDetails);
                        onClose();
                    },
                }}
            >
                <DialogTitle>Update Sales</DialogTitle>
                <DialogContent>
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
                    <TextField
                        autoFocus
                        required
                        value={noOfItems}
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="text"
                        onChange={(event) => {
                            setNoOfItems(event.target.value);
                        }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
