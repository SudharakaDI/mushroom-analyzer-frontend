import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {addNewProduction} from "../services/apiService.js";


export default function ProductionDialog({open, onClose}) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [noOfItems, setNoOfItems] = useState(null);

    async function addProduction(production) {
        try {
            const response = await addNewProduction(2, production);
            console.log(response);

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
                        const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null;
                        console.log(formattedDate);
                        const productionDetails = {
                            productionDate: formattedDate,
                            mushroomType: "OISTER",
                            packetWeight: 0,
                            packetPrice: 150,
                            numberOfItems: noOfItems
                        };
                        addProduction(productionDetails);
                        onClose();
                    },
                }}
            >
                <DialogTitle>Add Production</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={selectedDate} label="Basic date picker" onChange={(date) => setSelectedDate(date)}  />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        required
                        value={noOfItems}
                        margin="dense"
                        id="noOfItems"
                        name="noOfItems"
                        label="Number of Items"
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
